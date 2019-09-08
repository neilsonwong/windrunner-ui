import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';

@Component({
  selector: 'app-directory-detail',
  templateUrl: './directory-detail.component.html',
  styleUrls: ['./directory-detail.component.scss']
})
export class DirectoryDetailComponent implements OnInit {
  @Input() directory: FileData;
  
  constructor() { }

  ngOnInit() {
  }

}
