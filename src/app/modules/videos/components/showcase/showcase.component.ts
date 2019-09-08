import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  @Input() title: string;
  @Input() contents: FileData[];
  lastUpdated: number;

  constructor() { }

  ngOnInit() {
    console.log(this.contents);
    if (this.contents && this.contents.length > 0) {
      let lastFileUpdate = 0;
      // let last Updated
      for (const item of this.contents) {
        const curDate = Date.parse(item.birthTime);
        if (curDate > lastFileUpdate) {
          lastFileUpdate = curDate;
        }
      }
      this.lastUpdated = lastFileUpdate;
    }
  }
}
