import { Component, OnInit, Input } from '@angular/core';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  @Input() listName: string;
  @Input() emptyText: string;
  @Input() seriesList: DirectoryKind[];
  @Input() first: boolean;

  constructor(
  ) { }

  ngOnInit() {
  }

}
