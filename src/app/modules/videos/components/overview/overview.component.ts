import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileListService } from 'src/app/services/file-list.service';
import { isVideo } from '../../videos-util';

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

        //brute force compare
        if (JSON.stringify(this.latest) === JSON.stringify(filtered)) {
          console.log('DONT NEED TO UPDATE');
        }
        else {
          this.latest = filtered;
        }
      });

    this.fileListService.getPinned()
      .subscribe((data: FileData[]) => {
        this.curated = data;
      });
  }

}
