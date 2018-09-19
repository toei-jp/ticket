"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * authorize
 */
const debug = require("debug");
const auth_model_1 = require("../../models/auth/auth.model");
const auth2_model_1 = require("../../models/auth2/auth2.model");
const base_controller_1 = require("../base/base.controller");
const log = debug('ticket:authorize');
function getCredentials(__, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('getCredentials');
        try {
            const authModel = new auth_model_1.AuthModel();
            const options = {
                endpoint: process.env.CINERINO_API_ENDPOINT,
                auth: authModel.create()
            };
            const accessToken = yield options.auth.getAccessToken();
            const credentials = {
                accessToken: accessToken
            };
            res.json(credentials);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getCredentials = getCredentials;
function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signIn');
        const authModel = new auth2_model_1.Auth2Model(req.session.auth);
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
    });
}
exports.signIn = signIn;
function signInRedirect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signInRedirect');
        try {
            const authModel = new auth2_model_1.Auth2Model(req.session.auth);
            if (req.query.state !== authModel.state) {
                throw (new Error('state not matched'));
            }
            const auth = authModel.create();
            const credentials = yield auth.getToken(req.query.code, authModel.codeVerifier);
            // log('credentials published', credentials);
            authModel.credentials = credentials;
            authModel.save(req.session);
            auth.setCredentials(credentials);
            res.redirect('/');
        }
        catch (err) {
            next(err);
        }
    });
}
exports.signInRedirect = signInRedirect;
function signOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signOut');
        const authModel = new auth2_model_1.Auth2Model(req.session.auth);
        const auth = authModel.create();
        const logoutUrl = auth.generateLogoutUrl();
        log('logoutUrl:', logoutUrl);
        res.json({
            url: logoutUrl
        });
    });
}
exports.signOut = signOut;
function signOutRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        log('signOutRedirect');
        delete req.session.auth;
        res.redirect('/');
    });
}
exports.signOutRedirect = signOutRedirect;
var MemberType;
(function (MemberType) {
    MemberType["NotMember"] = "0";
    MemberType["Member"] = "1";
})(MemberType = exports.MemberType || (exports.MemberType = {}));
//# sourceMappingURL=authorize.controller.js.map