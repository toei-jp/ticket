/**
 * authorize
 */
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../../models/auth/auth.model';
import { Auth2Model } from '../../models/auth2/auth2.model';
import { errorProsess } from '../base/base.controller';
const log = debug('ticket:authorize');

export async function getCredentials(__: Request, res: Response) {
    log('getCredentials');
    try {
        const authModel = new AuthModel();
        const options = {
            endpoint: (<string>process.env.CINERINO_API_ENDPOINT),
            auth: authModel.create()
        };
        const accessToken = await options.auth.getAccessToken();
        const credentials = {
            accessToken: accessToken
        };

        res.json(credentials);
    } catch (err) {
        errorProsess(res, err);
    }
}

export async function signIn(req: Request, res: Response) {
    log('signIn');
    const authModel = new Auth2Model((<Express.Session>req.session).auth);
    const auth = authModel.create();
    authModel.codeVerifier = '12345';
    authModel.save(req.session);

    const authUrl = auth.generateAuthUrl({
        scopes: authModel.scopes,
        state: authModel.state,
        codeVerifier: authModel.codeVerifier
    });
    // console.log('authUrl:', authUrl);
    res.json({
        url: authUrl
    });
}

export async function signInRedirect(req: Request, res: Response, next: NextFunction) {
    log('signInRedirect');
    try {
        const authModel = new Auth2Model((<Express.Session>req.session).auth);
        if (req.query.state !== authModel.state) {
            throw (new Error('state not matched'));
        }
        const auth = authModel.create();
        const credentials = await auth.getToken(
            req.query.code,
            <string>authModel.codeVerifier
        );
        // log('credentials published', credentials);

        authModel.credentials = credentials;
        authModel.save(req.session);

        auth.setCredentials(credentials);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

export async function signOut(req: Request, res: Response) {
    log('signOut');
    const authModel = new Auth2Model((<Express.Session>req.session).auth);
    const auth = authModel.create();
    const logoutUrl = auth.generateLogoutUrl();
    log('logoutUrl:', logoutUrl);
    res.json({
        url: logoutUrl
    });
}

export async function signOutRedirect(req: Request, res: Response) {
    log('signOutRedirect');
    delete (<Express.Session>req.session).auth;
    res.redirect('/');
}

export enum MemberType {
    NotMember = '0',
    Member = '1'
}
