let config = {
    identityServerUrl: 'http://localhost:5300',
    accServiceUrl: 'http://localhost:5000/api/v1/acc',
    bmServiceUrl: 'http://localhost:5000/api/v1/bm',
    clientId: 'spa',
    scope: 'openid profile acc bm',
    redirectUri: 'http://localhost:5300/callback.html',
    silentRedirectUri: 'http://localhost:5300/silent-renew.html',
    postLogoutRedirectUri: 'http://localhost:5300'
}
if (process.env.VUE_APP_MODE === 'production') {
    config = {
        identityServerUrl: 'http://identity.svc',
        accServiceUrl: 'http://apigw/api/v1/acc',
        bmServiceUrl: 'http://apigw/api/v1/bm',
        clientId: 'spa',
        scope: 'openid profile acc bm',
        redirectUri: 'http://spa/callback.html',
        silentRedirectUri: 'http://spa/silent-renew.html',
        postLogoutRedirectUri: 'http://spa'
    }
}
export default config
