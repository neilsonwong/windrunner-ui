import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FileKind, DetailKind } from 'src/app/modules/shared/models/Files';
import DISPLAY_MODES from 'src/app/modules/shared/models/DisplayModes';
import { isDirectoryKind, isInvalid } from 'src/app/utils/fileTypeUtils';
import { UI_ROUTES } from 'src/app/modules/core/routes';
import { LinkData } from 'src/app/modules/shared/models/LinkData';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnChanges {
  @Input() files: FileKind[];
  @Input() details: DetailKind;
  @Input() loading: boolean;
  @Input() parent: LinkData;

  bookmarks: Map<string, number> = new Map<string, number>();
  seriesLink: string;
  displayMode: string;
  isInvalid: boolean = false;

  constructor(private location: Location) { }

  ngOnInit() {
    // default display mode line
    this.displayMode = DISPLAY_MODES.LINE;
  }

  ngOnChanges() {
    this.updateBookmarks();
    this.updateDetailRelatedFields();
  }

  private updateDetailRelatedFields(): void {
    if (this.details) {
      if (isDirectoryKind(this.details)) {
        // always allow series view
        this.seriesLink = `${UI_ROUTES.SERIES}${this.details.rel}`;
      }
      else if (isInvalid(this.details)) {
        this.isInvalid = true;
      }
    }
  }

  private updateBookmarks(): void {
    if (this.files && this.files.length > 0) {
      this.bookmarks.clear();
      this.files.forEach((file, index) => {
        const firstChar = file.name[0];
        if (!this.bookmarks.has(firstChar)) {
          this.bookmarks.set(firstChar, index);
        }
      });
    }
  }

  private changeDisplay(displayMode: string) {
    if (this.displayMode !== displayMode) {
      this.displayMode = displayMode;
    }
  }

  displayLineMode() {
    this.changeDisplay(DISPLAY_MODES.LINE);
  }
  displayListMode() {
    this.changeDisplay(DISPLAY_MODES.LIST);
  }
  displayPreviewMode() {
    this.changeDisplay(DISPLAY_MODES.PREVIEW);
  }

  goBack() {
    this.location.back();
  }
}
