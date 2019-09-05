import { Component, OnInit } from '@angular/core';
import { LinkData } from 'src/app/models/LinkData';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  navigation: LinkData[];

  constructor() { }

  ngOnInit() {
    this.setupNav();
  }

  setupNav() {
    this.navigation = [
      new LinkData('Home', '/v'),
      new LinkData('New!', '/v/new'),
      new LinkData('Browse', '/v/browse')
    ];
  }
}
