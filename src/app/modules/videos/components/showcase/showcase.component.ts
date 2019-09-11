import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileDataContainer } from '../../helper/file-data-container';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent extends FileDataContainer implements OnInit {
  @Input() showcaseTitle: string;
  @Input() contents: FileData[];
  debouncer: boolean;

  constructor() { 
    super();
  }

  ngOnInit() {
    this.debouncer = true;
    setTimeout(() => {
      this.debouncer = false;
    }, 100);
    this.populate(this.contents);
  }
}
