import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DirectoryKind } from 'src/app/modules/shared/models/Files';
import { LocalStorageService } from 'src/app/modules/core/services/local-storage.service';

const HIDDEN_SERIES = 'HIDDEN_SERIES';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit, OnChanges {
  @Input() seriesList: DirectoryKind[];
  @Input() listName: string;
  @Input() emptyText: string;
  @Input() first: boolean;
  @Input() itemsHidable: boolean;

  hiddenSeries: Array<string>;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.hiddenSeries = this.localStorageService.get(HIDDEN_SERIES) || [];
  }

  ngOnChanges() {
    if (this.itemsHidable) {
      this.filterSeries();
    }
  }

  private filterSeries() {
    if (this.seriesList) {
      this.seriesList = this.seriesList.filter((series: DirectoryKind) => {
        return !this.hiddenSeries.includes(series.rel);
      });
    }
  }

  public hideSeries(rel: string): void {
    if (!this.hiddenSeries.includes(rel)) {
      this.hiddenSeries.push(rel);
      this.localStorageService.set(HIDDEN_SERIES, this.hiddenSeries);
      this.filterSeries();
    }
  }
}
