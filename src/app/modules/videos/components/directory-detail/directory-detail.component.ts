import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { UserPrefService } from 'src/app/services/user-pref.service';

@Component({
  selector: 'app-directory-detail',
  templateUrl: './directory-detail.component.html',
  styleUrls: ['./directory-detail.component.scss']
})
export class DirectoryDetailComponent implements OnInit {
  @Input() directory: FileData;
  linkUrl: string;
  filePluralMapping: {[k: string]: string} = {'=1': '1 file', 'other': '# files'};

  bgColour: string;
  dirClass: string;
  isFav: boolean;
  
  constructor(private userPrefService: UserPrefService) { }

  ngOnInit() {
    // TODO: fix this in the future
    this.linkUrl = `/v/browse${this.directory.rel}`;
    this.setDirClass();
    this.bgColour = 'rainbow-' + (Math.floor(Math.random()*5) + 1);
    this.isFav = this.directory.metadata.isPinned;
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

  toggleFav() {
    if (this.directory.metadata.isPinned) {
      this.userPrefService.removeFavourite(this.directory.path)
        .subscribe((delWorked) => {
          if (delWorked) {
            this.directory.metadata.isPinned = false;
            this.isFav = false;
          }
          else {
            console.log('freaking dumbo')
          }
        });
    }
    else {
      this.userPrefService.addFavourite(this.directory.path)
        .subscribe((addWorked) => {
          if (addWorked) {
            this.directory.metadata.isPinned = true;
            this.isFav = true;
          }
          else {
            console.log('freaking dumbo')
          }
        });
    }
  }
}
