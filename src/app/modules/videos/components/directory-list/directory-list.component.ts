import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent implements OnInit {
  @Input() title: string;
  @Input() directories: FileData[];

  constructor() { }

  ngOnInit() {
  }

}
