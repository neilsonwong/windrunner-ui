import { Component, OnInit, Input } from '@angular/core';
import { FileData } from 'src/app/models/FileData';
import { FileDataContainer } from '../../helper/file-data-container';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent extends FileDataContainer implements OnInit {
  @Input() title: string;
  @Input() contents: FileData[];

  constructor() { 
    super();
  }

  ngOnInit() {
    this.populate(this.contents);
  }
}
