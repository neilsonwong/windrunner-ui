import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: environment.oauthClientId,
    // using implicit flow instead of code flow, as google requires secret
    // responseType: 'code',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    sessionChecksEnabled: true,
    showDebugInformation: true,
};