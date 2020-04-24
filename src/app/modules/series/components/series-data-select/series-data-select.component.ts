import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  updateSeriesOption(newAniListId: number) {
    this.seriesOptionChange.emit(newAniListId);
  }
}
