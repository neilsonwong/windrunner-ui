import { Component, OnInit, Input } from '@angular/core';
import { FileKind } from 'src/app/modules/shared/models/Files';

@Component({
  selector: 'app-leaf-view',
  templateUrl: './leaf-view.component.html',
  styleUrls: ['./leaf-view.component.scss']
})
export class LeafViewComponent implements OnInit {
  @Input() file: FileKind;
  url: string;

  constructor() { }

  ngOnInit() {
    this.url = `/v/browse${this.file.rel}`;
  }

}
