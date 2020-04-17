import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const api = environment.api;

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor() { }

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
    return this.bannerUrl;
  }
}