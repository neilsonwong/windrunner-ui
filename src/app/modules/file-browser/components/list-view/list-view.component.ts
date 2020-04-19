import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FileKind } from 'src/app/modules/shared/models/Files';
import DISPLAY_MODES from 'src/app/modules/shared/models/DisplayModes';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  @Input() files: FileKind[];
  @Input() bookmarks: Map<string, number>;
  
  displayMode: string;

  constructor(private location: Location) { }

  ngOnInit() {
    // default display mode line
    this.displayMode = DISPLAY_MODES.LINE;
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
