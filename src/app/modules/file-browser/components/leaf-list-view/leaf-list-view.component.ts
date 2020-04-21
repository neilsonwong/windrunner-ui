import { Component } from '@angular/core';
import { AbstractLeafViewComponent } from '../abstract-leaf-view/abstract-leaf-view.component';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { PendingResourceRetrievalService } from 'src/app/modules/core/services/pending-resource-retrieval.service';

@Component({
  selector: 'app-leaf-list-view',
  templateUrl: './leaf-list-view.component.html',
  styleUrls: ['./leaf-list-view.component.scss']
})
export class LeafListViewComponent extends AbstractLeafViewComponent {

  constructor(protected fileListService: FileListService,
    protected pendingService: PendingResourceRetrievalService) {
    super(fileListService, pendingService);
  }
}
