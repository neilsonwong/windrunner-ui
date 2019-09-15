import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileListService } from 'src/app/services/file-list.service';
import { isVideo } from '../../../videos-util';
import { updateArrayInPlace } from '../../../../../utils/streamDataUtils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  latest$: Observable<FileData[]>;
  favourites$: Observable<FileData[]>;
  // random: FileData[];

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    this.getLatest();
  }

  getLatest() {
    this.latest$ = this.fileListService.getRecent()
      .pipe(map((data: FileData[]) => {
        const filtered = data.filter(e => isVideo(e.name));
        return filtered;
        /*
        if (!this.latest) {
          this.latest = filtered;
        }
        else {
          // special in place update
          updateArrayInPlace<FileData>(this.latest, filtered);
        }
        */
      }));

    this.favourites$ = this.fileListService.getPinned()
      // .subscribe((data: FileData[]) => {
      //   this.favourites = data;
      // });
  }
}
