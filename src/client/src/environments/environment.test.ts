// tslint:disable:no-http-string
/**
 * 環境変数test
 */
export const environment = {
    production: false,
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
    toeiAuthRedirectUri: 'https://toei-ticket-test.azurewebsites.net/assets/signIn.html',
    toeiAuthLogoutUri: 'https://toei-ticket-test.azurewebsites.net/assets/signOut.html',
    tokenIssuer: '',
    toeiAPIEndpoint: 'https://toei-cinerino-api-test.azurewebsites.net',

    resourceServerDomain: 'https://toei-cinerino-api-test.azurewebsites.net',

    portalSite: '',
    ticketingSite: 'https://localhost',
    entranceServerUrl: '',

    analyticsId: ''
};
