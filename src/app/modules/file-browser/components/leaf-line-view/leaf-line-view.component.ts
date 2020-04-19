import { Component, OnInit, Input } from '@angular/core';
import { FileKind } from 'src/app/modules/shared/models/Files';
import { AbstractLeafViewComponent } from '../abstract-leaf-view/abstract-leaf-view.component';
import { FileListService } from 'src/app/modules/core/services/file-list.service';

@Component({
  selector: 'app-leaf-line-view',
  templateUrl: './leaf-line-view.component.html',
  styleUrls: ['./leaf-line-view.component.scss']
})
export class LeafLineViewComponent extends AbstractLeafViewComponent {

  constructor(protected fileListService: FileListService) {
    super(fileListService);
  }
}
