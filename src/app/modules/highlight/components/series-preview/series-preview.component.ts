import { Component, HostBinding, HostListener, OnChanges } from '@angular/core';
import { SeriesDirectory } from 'src/app/modules/shared/models/Files';
import { isSeries } from 'src/app/utils/fileTypeUtils';
import { Observable } from 'rxjs';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { map, tap } from 'rxjs/operators';
import { PendingResourceRetrievalService } from 'src/app/modules/core/services/pending-resource-retrieval.service';
import { AbstractSeriesDataComponent } from 'src/app/modules/shared/components/abstract-series-data/abstract-series-data.component';

@Component({
  selector: 'app-series-preview',
  templateUrl: './series-preview.component.html',
  styleUrls: ['./series-preview.component.scss']
})
export class SeriesPreviewComponent extends AbstractSeriesDataComponent implements OnChanges {
  @HostBinding('class.series') get isSeries() {
    return this.identified;
  }

  constructor(
    private headerTweakService: HeaderTweakService,
    private pendingService: PendingResourceRetrievalService,
    protected fileListService: FileListService) { 
      super();
    }

  ngOnChanges() {
    super.ngOnChanges();
    if (!this.identified) {
      // this is a normal dir atm
      this.pendingService.waitForPromised<SeriesDirectory>(this.series.promised, this.getDetails$())
        .pipe(tap((updated: SeriesDirectory) => this.handleUpdatedValue(updated))).subscribe();
    }
  }

  protected getDetails$(): Observable<SeriesDirectory> {
    return this.fileListService.getFileDetail(this.series.rel)
      .pipe(map(result => (
        (isSeries(result)) ?
          result :
          null
      )));
  }

  protected handleUpdatedValue(updated: SeriesDirectory): void {
    if (updated !== null) {
      this.series = updated;
      this.populateSeriesValues(updated);
    }
  }

  @HostListener('hoverChange', ['$event'])
  private onHover(isHovered: boolean) {
    if (isHovered) {
      this.headerTweakService.showBanner(this.bannerImage);
    }
    else {
      this.headerTweakService.removeBanner();
    }
  }
}
