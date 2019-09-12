import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileDataContainer } from '../../helper/file-data-container';
import { LinkData } from 'src/app/models/LinkData';
import { UserPrefService } from 'src/app/services/user-pref.service';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent extends FileDataContainer implements OnChanges {
  @Input() baseDir: FileData;
  @Input() heading: Array<string | LinkData>;
  @Input() directories: FileData[];

  constructor(private userPrefService: UserPrefService) {
    super();
   }

  ngOnChanges() {
    this.populate(this.directories);
  }
}
