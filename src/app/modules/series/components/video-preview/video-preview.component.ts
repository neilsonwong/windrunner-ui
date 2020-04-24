import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Video } from 'src/app/modules/shared/models/Files';
import { API_ROUTES } from 'src/app/modules/core/routes';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.scss']
})
export class VideoPreviewComponent implements OnChanges {
  @Input() video: Video;
  
  thumbnailUrls: Array<string>;

  constructor() { }

  ngOnChanges() {
    this.thumbnailUrls = this.video.thumbnail.map(
      (thumbId: string) => (`${API_ROUTES.IMG_THUMBNAIL}/${thumbId}`));
  }

}
