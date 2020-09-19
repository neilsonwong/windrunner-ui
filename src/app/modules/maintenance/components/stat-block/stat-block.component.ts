import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.scss']
})
export class StatBlockComponent implements OnInit {
  @Input() title: String;
  @Input() value: any;

  constructor() { }

  ngOnInit() {
  }

}
