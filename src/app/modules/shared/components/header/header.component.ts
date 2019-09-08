import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { LinkData } from 'src/app/models/LinkData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() navigation: LinkData[];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  highlight: string;

  constructor(private location: Location) { }

  ngOnInit() {
    this.updateHighlight(this.location.path(false));
    this.location.onUrlChange((url: string, state: unknown) => {
      this.updateHighlight(url);
    });
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

  handleSearch(query) {
    this.search.emit(query);
  }
}
