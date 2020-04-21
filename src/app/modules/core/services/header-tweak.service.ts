import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, tap, distinctUntilChanged } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import HeaderTweaks from '../../shared/models/HeaderTweaks';

@Injectable({
  providedIn: 'root'
})
export class HeaderTweakService {
  private tweaks: HeaderTweaks;

  constructor(private router: Router) {
    this.tweaks = {
      banner: new Subject(),
      compact: new BehaviorSubject(false)
    };

    this.router.events.pipe(
      filter(event => (event instanceof NavigationEnd)),
      tap(() => { this.resetToDefaultState() })
    ).subscribe();
  }

  resetToDefaultState(): void {
    this.removeBanner();
    this.resetCompact();
  }

  setCompact() {
    this.tweaks.compact.next(true);
  }

  resetCompact() {
    this.tweaks.compact.next(false);
  }

  showBanner(url: string): void {
    if (url) {
      this.tweaks.banner.next(url);
    }
  }

  removeBanner(): void {
    this.tweaks.banner.next('');
  }

  getCompactUpdates(): Observable<boolean> {
    return this.tweaks.compact
      .pipe(distinctUntilChanged());
  }

  getBannerUpdates(): Observable<string> {
    return this.tweaks.banner
      .pipe(distinctUntilChanged());
  }
}