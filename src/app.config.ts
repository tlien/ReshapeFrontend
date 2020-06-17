const config = {
    identityServerUrl: 'http://host.docker.internal:5200',
    accServiceUrl: 'http://localhost:5000/api/v1/acc',
    bmServiceUrl: 'http://localhost:5000/api/v1/bm',
    clientId: 'ReshapeFrontend',
    scope: 'openid profile role acc bm gateway',
    redirectUri: 'http://localhost:5300/callback.html',
    silentRedirectUri: 'http://localhost:5300/silent-renew.html',
    postLogoutRedirectUri: 'http://localhost:5300'
};

export default config;
