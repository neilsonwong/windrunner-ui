import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { isVideo } from '../../videos-util';
import { updateArrayInPlace } from 'src/app/utils/streamDataUtils';
import { FileListService } from 'src/app/services/file-list.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  latest: FileData[];

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    this.getLatest();
  }

  getLatest() {
    this.fileListService.getRecent()
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
  }
}
