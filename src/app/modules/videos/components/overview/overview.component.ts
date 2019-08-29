import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/models/FileData';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  latest: FileData[];
  curated: FileData[];
  random: FileData[];

  constructor() { }

  ngOnInit() {
  }

}
