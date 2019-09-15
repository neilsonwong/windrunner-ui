import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { isVideo } from '../../../videos-util';
import { FileListService } from 'src/app/services/file-list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  latest$: Observable<FileData[]>;

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    this.latest$ = this.getLatest();
  }

  getLatest(): Observable<FileData[]> {
    return this.fileListService.getRecent()
      .pipe(map((data: FileData[]) => {
        const filtered = data.filter(e => isVideo(e.name));
        return filtered;
      }));
  }
}
