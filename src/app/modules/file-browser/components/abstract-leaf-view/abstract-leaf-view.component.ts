import { Component, Input, OnChanges } from "@angular/core";
import { DetailKind, FileKind } from 'src/app/modules/shared/models/Files';
import { UI_ROUTES } from 'src/app/modules/core/routes';
import { isVideo, isDirectoryKind, isSeries } from 'src/app/utils/fileTypeUtils';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { Observable } from 'rxjs';
import { PendingResourceRetrievalService } from 'src/app/modules/core/services/pending-resource-retrieval.service';
import { tap } from 'rxjs/operators';

@Component({ template: '' })
export class AbstractLeafViewComponent implements OnChanges {
  @Input() file: FileKind;
  url: string;
  icon: string;

  constructor(protected fileListService: FileListService,
    protected pendingService: PendingResourceRetrievalService) { }

  ngOnChanges() {
    if (this.file) {
      this.populateValues();
      if (!isVideo(this.file)) {
        // video is our final state, we good already!
        this.pendingService.waitForPromised<DetailKind>(this.file.promised, this.getDetails$())
          .pipe(tap((updated: DetailKind) => this.handleUpdatedValue(updated))).subscribe();
      }
    }
  }

  populateValues() {
    // rel contains a slash already
    if (isSeries(this.file)) {
      this.url = `${UI_ROUTES.SERIES}${this.file.rel}`;
    }
    else if (isDirectoryKind(this.file)) {
      this.url = `${UI_ROUTES.BROWSE}${this.file.rel}`;
    }
    this.icon = this.file.type.toLocaleLowerCase();
  }

  protected getDetails$(): Observable<DetailKind> {
    return this.fileListService.getFileDetail(this.file.rel);
  }

  protected handleUpdatedValue(updated: DetailKind): void {
    if (updated) {
      this.file = updated;
      this.populateValues();
    }
  }
}