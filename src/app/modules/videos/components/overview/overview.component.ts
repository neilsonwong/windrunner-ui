import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileListService } from 'src/app/services/file-list.service';
import { isVideo } from '../../videos-util';
import { updateArrayInPlace } from '../../../../utils/streamDataUtils';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  latest: FileData[];
  curated: FileData[];
  // random: FileData[];

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    // this.fileListService.testOboe();
    this.getLatest();
  }

  getLatest() {
    this.fileListService.streamRecent()
      .subscribe((data: FileData[]) => {
        const filtered = data.filter(e => isVideo(e.name));
        if (!this.latest) {
          this.latest = filtered;
        }
        else {
          // special in place update
          updateArrayInPlace<FileData>(this.latest, filtered);
        }
      });

    this.fileListService.getPinned()
      .subscribe((data: FileData[]) => {
        this.curated = data;
      });
  }

}
