import { Component, OnInit, Input } from '@angular/core';
import { FileKind } from 'src/app/modules/shared/models/Files';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() files: FileKind[];
  @Input() bookmarks: string[];
  
  displayType: string;

  constructor() { }

  ngOnInit() {
    this.displayType = 'line';
  }

  changeDisplay(displayType: string) {
    this.displayType = displayType;
  }
}
