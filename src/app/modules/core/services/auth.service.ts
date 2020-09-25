import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, tap } from 'rxjs/operators';
import { authCodeFlowConfig } from '../auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // if we want localstorage later
  // https://manfredsteyer.github.io/angular-oauth2-oidc/docs/additional-documentation/configure-custom-oauthstorage.html
  private authContextSubject$ = new BehaviorSubject<string>(null);
  public authContext$: Observable<string>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private oauthService: OAuthService) {
    this.authContext$ = this.authContextSubject$.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay(),
    );
    this.isAuthenticated$ = this.authContext$.pipe(
      map(a => (a !== null && a !== undefined))
    );

    this.oauthService.events
      .subscribe(e => {
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