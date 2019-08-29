import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  place: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.decodeLocationFromUrl();
  }

  private decodeLocationFromUrl() {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      this.place = segments
        .map(e => decodeURIComponent(e.toString()))
        .join('/');

      console.log(this.place);
    });
  }
}
