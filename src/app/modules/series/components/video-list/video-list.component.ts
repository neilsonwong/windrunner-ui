import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Video, FileKind } from 'src/app/modules/shared/models/Files';
import { EpisodePipe } from 'src/app/modules/shared/pipes/episode.pipe';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnChanges {
  @Input() videos: FileKind[];
  constructor() { }

  ngOnChanges() {
    if (this.videos) {
      console.time('sort');
      // resort the video files
      // const vals = this.videos.map((vid) => {
      //   const epData = EpisodePipe.inferEpisodeData(vid.name);
      //   return epData;
      // });

      this.videos.sort((a: FileKind, b: FileKind) => {
        const aData = EpisodePipe.inferEpisodeData(a.name);
        const bData = EpisodePipe.inferEpisodeData(b.name);

        // if null, it is last, GO FIX THE NAME
        if (aData === null) {
          return 1;
        }
        else if (bData === null) {
          return -1
        }
        else {
          // sort by show first, then ep #
          if (aData.anime === bData.anime) {
            return aData.ep - bData.ep;
          }
          else {
            return aData.anime.localeCompare(bData.anime);
          }
        }
      });
      console.timeEnd('sort');
    }
  }
}
