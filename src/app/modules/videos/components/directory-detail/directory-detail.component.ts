import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';

@Component({
  selector: 'app-directory-detail',
  templateUrl: './directory-detail.component.html',
  styleUrls: ['./directory-detail.component.scss']
})
export class DirectoryDetailComponent implements OnInit {
  @Input() directory: FileData;
  dirClass: string;
  linkUrl: string;
  filePluralMapping: {[k: string]: string} = {'=1': '1 file', 'other': '# files'};
  
  constructor() { }

  ngOnInit() {
    // TODO: fix this in the future
    this.linkUrl = `/v/browse${this.directory.rel}`;
    this.setDirClass();
  }

  setDirClass() {
    if (this.directory.metadata) {
      if (this.directory.metadata.fileCount > 50) {
        return this.dirClass = 'big';
      }
      else if (this.directory.metadata.fileCount > 10) {
        return this.dirClass = 'medium';
      }
    }
    return this.dirClass = 'small';
  }
}
