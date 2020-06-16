/* eslint-disable import/no-unresolved */
import { UserManager, WebStorageStateStore, User, UserManagerSettings } from 'oidc-client';
import config from '@/app.config';

export default class AuthService {
    private userManager: UserManager;

    constructor() {
        const settings: UserManagerSettings = {
            userStore: new WebStorageStateStore({ store: window.localStorage }),
            authority: config.identityServerUrl,
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            automaticSilentRenew: true,
            silent_redirect_uri: config.silentRedirectUri,
            response_type: 'code',
            scope: config.scope,
            post_logout_redirect_uri: config.postLogoutRedirectUri,
            filterProtocolClaims: true
        };

        console.log(settings);
        this.userManager = new UserManager(settings);
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public getAccessToken(): Promise<string> {
        return this.userManager.getUser().then((data: any) => {
            return data.access_token;
        });
    }
}
