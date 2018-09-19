// tslint:disable:no-http-string
/**
 * 環境変数dev
 */
export const environment = {
    production: false,
    version: '1.0.0',

    region: 'ap-northeast-1', // identity poolのリージョンを指定する

    identityPoolId: 'ap-northeast-1:49f4caee-80e0-429a-8f8d-4850b626d96d', // identity poolのID(AWS consoleで確認)
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
    toeiAuthRedirectUri: 'https://toei-ticket-development.azurewebsites.net/assets/signIn.html',
    toeiAuthLogoutUri: 'https://toei-ticket-development.azurewebsites.net/assets/signOut.html',
    tokenIssuer: '',
    toeiAPIEndpoint: 'https://toei-cinerino-api-development.azurewebsites.net',

    resourceServerDomain: 'https://toei-cinerino-api-development.azurewebsites.net',

    portalSite: '',
    ticketingSite: 'https://localhost',
    entranceServerUrl: '',

    analyticsId: ''
};
