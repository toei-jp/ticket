// tslint:disable:no-http-string
/**
 * 環境変数prod
 */
export const environment = {
    production: true,
    version: '1.0.0',

    region: '', // identity poolのリージョンを指定する

    identityPoolId: '', // identity poolのID(AWS consoleで確認)
    userPoolId: '',
    clientId: '',

    rekognitionBucket: '',
    albumName: '',
    bucketRegion: '',

    ddbTableName: '',

    cognito_idp_endpoint: '',
    cognito_identity_endpoint: '',
    sts_endpoint: '',

    toeiAuthDomain: '',
    toeiAuthRedirectUri: '',
    toeiAuthLogoutUri: '',
    tokenIssuer: '',
    toeiAPIEndpoint: '',

    resourceServerDomain: '',

    portalSite: '',
    ticketingSite: '',
    entranceServerUrl: '',

    analyticsId: ''
};
