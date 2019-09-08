import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileDataContainer } from '../../helper/file-data-container';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent extends FileDataContainer implements OnChanges {
  @Input() baseDir: string;
  @Input() directories: FileData[];

  constructor() {
    super();
   }

  ngOnChanges() {
    this.populate(this.directories);
  }

}
