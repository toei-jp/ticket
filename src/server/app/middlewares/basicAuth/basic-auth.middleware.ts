import * as basicAuth from 'basic-auth';
import * as createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-status';

const debug = createDebug('toei-frontend:middlewares:basicAuth');

/**
 * ベーシック認証ミドルウェア
 *
 * @module basicAuthMiddleware
 */
export default (req: Request, res: Response, next: NextFunction) => {
    // ベーシック認証のための環境変数設定なければスルー
    if (process.env.BASIC_AUTH_NAME === undefined || process.env.BASIC_AUTH_PASS === undefined) {
        next();

        return;
    }

    debug('authenticating...', process.env.BASIC_AUTH_NAME);
    const user = basicAuth(req);
    if (user !== undefined
        && user.name === process.env.BASIC_AUTH_NAME
        && user.pass === process.env.BASIC_AUTH_PASS) {
        debug('authenticated!');
        // 認証情報が正しければOK
        next();

        return;
    }

    res.setHeader('WWW-Authenticate', 'Basic realm="TOEI Authentication"');
    res.status(UNAUTHORIZED).end('Unauthorized');
};
