import { Component, OnInit } from '@angular/core';
import { LinkData } from 'src/app/modules/shared/models/LinkData';

@Component({
  selector: 'app-video-app',
  templateUrl: './video-app.component.html',
  styleUrls: ['./video-app.component.scss']
})
export class VideoAppComponent implements OnInit {

  navigation: Array<LinkData> = [
    { text: 'Home', url: '/v', match: new RegExp('/v$') },
    { text: 'Browse', url: '/v/browse/anime', match: new RegExp('/v/(browse|series)/.*') },
    { text: 'お勧め', url: '/v/recommend', match: new RegExp('/v/recommend') }
  ];

  constructor() { }

  ngOnInit() {
    this.navigation.push(
      { text: 'Maintenance', url: '/v/maintenance', match: new RegExp('/v/maintenance') }
    );
  }
}
