import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileDataContainer } from '../../helper/file-data-container';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent extends FileDataContainer implements OnInit, OnChanges {
  @Input() showcaseTitle: string;
  @Input() contents: FileData[];
  @Input() baseDir: FileData;
  debouncer: boolean;

  constructor() { 
    super();
  }

  ngOnInit() {
    this.debouncer = true;
    setTimeout(() => {
      this.debouncer = false;
    }, 100);
  }
  
  ngOnChanges() {
    this.populate(this.contents);
  }
}
