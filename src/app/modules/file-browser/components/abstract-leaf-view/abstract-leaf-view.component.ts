import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DetailKind, FileKind } from 'src/app/modules/shared/models/Files';
import { UI_ROUTES } from 'src/app/modules/core/routes';
import { isVideo, isDirectoryKind } from 'src/app/utils/fileTypeUtils';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { Observable } from 'rxjs';
import { AbstractPromisedComponent } from 'src/app/modules/shared/components/abstract-promised/abstract-promised.component';

@Component({ template: '' })
export class AbstractLeafViewComponent extends AbstractPromisedComponent<DetailKind> implements OnChanges {
  @Input() file: FileKind;
  url: string;
  icon: string;

  constructor(protected fileListService: FileListService) {
    super(fileListService);
  }

  ngOnChanges() {
    if (this.file) {
      this.populateValues();
      if (!isVideo(this.file)) {
        // video is our final state, we good already!
        this.waitForPromised(this.file.promised);
      }
    }
  }

  populateValues() {
    // rel contains a slash already
    if (isDirectoryKind(this.file)) {
      this.url = `${UI_ROUTES.BROWSE}${this.file.rel}`;
    }
    this.icon = this.file.type.toLocaleLowerCase();
  }

  // abstract implementation
  protected tryGetResource(): Observable<DetailKind> {
    return this.fileListService.getFileDetail(this.file.rel);
  }

  // abstract implementation
  protected handleUpdatedValue(updated: DetailKind): void {
    this.file = updated;
    this.populateValues();
  }
}