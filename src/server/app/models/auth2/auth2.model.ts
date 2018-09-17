import * as cinerino from '@toei-jp/cinerino-api-nodejs-client';
import * as uuid from 'uuid';

/**
 * 認証セッション
 * @interface IAuth2Session
 */
export interface IAuth2Session {
    /**
     * 状態
     */
    state: string;
    /**
     * スコープ
     */
    scopes: string[];
    /**
     * 資格情報
     */
    credentials?: any;
    /**
     * コード検証
     */
    codeVerifier?: string;
}

/**
 * 認証モデル
 * @class Auth2Model
 */
export class Auth2Model {
    /**
     * 状態
     */
    public state: string;
    /**
     * スコープ
     */
    public scopes: string[];
    /**
     * 資格情報
     */
    public credentials?: any;
    /**
     * コード検証
     */
    public codeVerifier?: string;

    /**
     * @constructor
     * @param {any} session
     */
    constructor(session?: any) {
        if (session === undefined) {
            session = {};
        }
        this.state = (session.state !== undefined) ? session.state : uuid.v1();
        const resourceServerUrl  = <string>process.env.RESOURCE_SERVER_URL;
        this.scopes = (session.scopes !== undefined) ? session.scopes : [
            `${resourceServerUrl}/transactions`,
            `${resourceServerUrl}/events.read-only`,
            `${resourceServerUrl}/organizations.read-only`,
            `${resourceServerUrl}/orders.read-only`,
            `${resourceServerUrl}/places.read-only`
        ];
        this.credentials = session.credentials;
        this.codeVerifier = session.codeVerifier;
    }

    /**
     * 認証クラス作成
     * @memberof Auth2Model
     * @method create
     * @returns {cinerino.auth.ClientCredentials}
     */
    public create(): cinerino.auth.OAuth2 {
        const auth = new cinerino.auth.OAuth2({
            domain: (<string>process.env.AUTHORIZE_SERVER_DOMAIN),
            clientId: (<string>process.env.CLIENT_ID_OAUTH2),
            clientSecret: (<string>process.env.CLIENT_SECRET_OAUTH2),
            redirectUri: (<string>process.env.AUTH_REDIRECT_URI),
            logoutUri: (<string>process.env.AUTH_LOGUOT_URI),
            state: this.state,
            scopes: this.scopes
        });
        if (this.credentials !== undefined) {
            auth.setCredentials(this.credentials);
        }

        return auth;
    }

    /**
     * セッションへ保存
     * @memberof Auth2Model
     * @method save
     * @returns {Object}
     */
    public save(session: any): void {
        const authSession: IAuth2Session = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
