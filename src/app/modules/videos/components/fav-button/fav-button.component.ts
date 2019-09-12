import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { UserPrefService } from 'src/app/services/user-pref.service';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss']
})
export class FavButtonComponent implements OnInit {
  @Input() directory: FileData;
  constructor(private userPrefService: UserPrefService) { }

  ngOnInit() {
  }

  toggleFav() {
    if (this.directory.metadata.isPinned) {
      this.userPrefService.removeFavourite(this.directory.path)
        .subscribe((delWorked) => {
          if (delWorked) {
            this.directory.metadata.isPinned = false;
          }
        });
    }
    else {
      this.userPrefService.addFavourite(this.directory.path)
        .subscribe((addWorked) => {
          if (addWorked) {
            this.directory.metadata.isPinned = true;
          }
        });
    }
  }

}
