import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { LinkData } from 'src/app/modules/shared/models/LinkData';
import { BannerService } from 'src/app/modules/core/services/banner.service';
import { Observable } from 'rxjs';
import { map, delay, tap, filter } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() navigation: LinkData[];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  highlight: string;
  bannerUpdates$: Observable<SafeStyle>;
  bannerOpacity: number = 0;

  constructor(private location: Location,
    private sanitizer: DomSanitizer,
    private bannerService: BannerService) { }

  ngOnInit() {
    this.updateHighlight(this.location.path(false));
    this.location.onUrlChange((url: string, state: unknown) => {
      this.updateHighlight(url);
    });
    this.bannerUpdates$ = this.bannerService.getBannerUpdates().pipe(
      tap(url => (this.bannerOpacity = (url) ? 0.1 : 0)),
      filter(url => url !== ''),
      map(url => (this.sanitizer.bypassSecurityTrustStyle(`url(${url})`)))
    );
  }

  updateHighlight(newUrl: string) {
    for (const navItem of this.navigation) {
      if (navItem.url === newUrl) {
        this.highlight = navItem.text;
        return;
      }
    }

    // couldn't find an exact match, partial matches are ok now
    for (const navItem of this.navigation) {
      if (navItem.url.startsWith(newUrl)) {
        this.highlight = navItem.text;
        return;
      }
    }
  }

  handleSearch(query: any) {
    this.search.emit(query);
  }
}
