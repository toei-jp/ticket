"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicAuth = require("basic-auth");
const createDebug = require("debug");
const http_status_1 = require("http-status");
const debug = createDebug('toei-frontend:middlewares:basicAuth');
/**
 * ベーシック認証ミドルウェア
 *
 * @module basicAuthMiddleware
 */
exports.default = (req, res, next) => {
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
    res.status(http_status_1.UNAUTHORIZED).end('Unauthorized');
};
//# sourceMappingURL=basic-auth.middleware.js.map