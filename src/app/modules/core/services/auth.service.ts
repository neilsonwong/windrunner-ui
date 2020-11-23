import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private oauthService: OAuthService,
    private router: Router
  ) {
    this.authContext$ = this.authContextSubject$.asObservable().pipe(
      distinctUntilChanged(),
      shareReplay(1),
    );
    this.isAuthenticated$ = this.authContext$.pipe(
      map(a => (a !== null && a !== undefined))
    );

    this.oauthService.events
      .subscribe(e => {
        if (this.oauthService.hasValidAccessToken()) {
          this.handleLoginSuccess();
        }
      });

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public login(redirectTo?: string) {
    this.oauthService.initLoginFlow(redirectTo || this.router.url);
  }

  public logout() {
    this.oauthService.revokeTokenAndLogout();
    this.authContextSubject$.next(undefined);
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  private handleLoginSuccess(): void {
    const claims = this.oauthService.getIdentityClaims();
    this.authContextSubject$.next(claims['email']);
    console.log('logged in: ' + claims['email']);
    if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
      this.router.navigateByUrl(this.oauthService.state);
    }
  }
}