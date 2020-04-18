import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter, tap, distinctUntilChanged } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd)),
      tap(() => { this.removeBanner(); })
    ).subscribe();
  }

  private bannerUrl: Subject<string> = new Subject();

  showBanner(url: string) {
    if (url) {
      this.bannerUrl.next(url);
    }
  }

  removeBanner() {
    this.bannerUrl.next('');
  }

  getBannerUpdates(): Observable<string> {
    return this.bannerUrl
      .pipe(distinctUntilChanged());
  }
}