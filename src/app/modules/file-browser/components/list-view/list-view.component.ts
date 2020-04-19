import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { FileKind } from 'src/app/modules/shared/models/Files';
import DISPLAY_MODES from 'src/app/modules/shared/models/DisplayModes';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnChanges {
  @Input() files: FileKind[];
  bookmarks: Map<string, number> = new Map<string, number>();
  
  displayMode: string;

  constructor(private location: Location) { }

  ngOnInit() {
    // default display mode line
    this.displayMode = DISPLAY_MODES.LINE;
  }

  ngOnChanges() {
    this.bookmarks.clear();
    this.files.forEach((file, index) => {
      const firstChar = file.name[0];
      if (!this.bookmarks.has(firstChar)) {
        this.bookmarks.set(firstChar, index);
      }
    });
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
