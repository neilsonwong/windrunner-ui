import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { authCodeFlowConfig } from '../auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // if we want localstorage later
  // https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/configure-custom-oauthstorage.html
  private authContextSubject$ = new BehaviorSubject<string>(null);
  public authContext$ = this.authContextSubject$.asObservable();

  constructor(private oauthService: OAuthService) {
    this.oauthService.events
      .subscribe(_ => {
        if (this.oauthService.hasValidAccessToken()) {
          const claims = this.oauthService.getIdentityClaims();
          this.authContextSubject$.next(claims['email']);
        }
      });

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logout() {
    this.oauthService.revokeTokenAndLogout();
    this.authContextSubject$.next(undefined);
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }
}