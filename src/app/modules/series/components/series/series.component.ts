import { Component, OnInit } from '@angular/core';
import { HeaderTweakService } from 'src/app/modules/core/services/header-tweak.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  constructor(
    private headerTweakService: HeaderTweakService
  ) { }

  ngOnInit() {
    this.headerTweakService.setCompact();
    console.log('set header')
  }

}
