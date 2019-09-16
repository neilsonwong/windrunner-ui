import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileData } from 'src/app/models/FileData';
import { FileListService } from 'src/app/services/file-list.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favourites$: Observable<FileData[]>;

  constructor(private fileListService: FileListService) { }

  ngOnInit() {
    this.favourites$ = this.fileListService.getPinned();
  }

}
