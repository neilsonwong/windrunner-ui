import { Component, OnInit } from '@angular/core';
import { LinkData } from 'src/app/modules/shared/models/LinkData';

@Component({
  selector: 'app-video-app',
  templateUrl: './video-app.component.html',
  styleUrls: ['./video-app.component.scss']
})
export class VideoAppComponent implements OnInit {

  navigation: Array<LinkData> = [
    { text: 'Home', url: '/v' },
    { text: 'Browse', url: '/v/browse' },
    { text: 'お勧め', url: '/v/recommend' }
  ];

  constructor() { }

  ngOnInit() {
    this.navigation.push(
      { text: 'maintenance', url: '/v/maintenance' }
    );
  }
}
