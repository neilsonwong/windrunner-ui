import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeriesOptions } from 'src/app/modules/shared/models/SeriesOptions';

@Component({
  selector: 'app-series-data-select',
  templateUrl: './series-data-select.component.html',
  styleUrls: ['./series-data-select.component.scss']
})
export class SeriesDataSelectComponent implements OnInit {
  @Input() optionsList: SeriesOptions;
  @Input() current: number;
  @Output() seriesOptionChange: EventEmitter<number> = new EventEmitter<number>();

  manualId: string;

  constructor() { }

  ngOnInit() {
  }

  updateSeriesOption(newAniListId: number) {
    this.seriesOptionChange.emit(newAniListId);
  }

  updateAniListEntry() {
    // check if it's a number
    const entered = parseInt(this.manualId, 10);
    if (!isNaN(entered) && entered > 0) {
      this.updateSeriesOption(entered);
    }
    else {
      console.log(`${entered} was not valid`);
    }
  }
}
