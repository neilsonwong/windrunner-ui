import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { LinkData } from 'src/app/modules/shared/models/LinkData';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() navigation: LinkData[];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  highlight: string;
  bannerUpdates$: Observable<string>;
  bannerOpacity: number = 0;

  compact$: Observable<boolean>;
  transparent$: Observable<boolean>;

  constructor(private location: Location,
    private headerTweakService: HeaderTweakService) { }

  ngOnInit() {
    this.updateHighlight(this.location.path(false));
    this.location.onUrlChange((url: string, state: unknown) => {
      this.updateHighlight(url);
    });
    this.bannerUpdates$ = this.headerTweakService.getBannerUpdates().pipe(
      tap(url => (this.bannerOpacity = (url) ? 0.1 : 0)),
      filter(url => url !== ''),
      // map(url => (this.sanitizer.bypassSecurityTrustStyle(`url(${url})`)))
    );
    this.compact$ = this.headerTweakService.getCompactUpdates();
    this.transparent$ = this.headerTweakService.getTransparentUpdates();
  }

  updateHighlight(newUrl: string) {
    for (const navItem of this.navigation) {
      if (navItem.match.test(newUrl)) {
        this.highlight = navItem.text;
        return;
      }
    }

    // no highlights, nothing matched
    this.highlight = '';
  }

  handleSearch(query: any) {
    this.search.emit(query);
  }
}
