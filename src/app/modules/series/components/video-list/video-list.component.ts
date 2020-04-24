import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'src/app/modules/shared/models/Files';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() videos: Video[];
  constructor() { }

  ngOnInit() {
  }

}
