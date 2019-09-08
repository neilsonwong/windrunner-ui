import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() errorMessage: string;
  face: string;
  private emojis = [
    `(;-;)`, `(='X'=)`, `(≥o≤)`, `(·.·)`, `(^-^")`, `(T-T)`, `(╯°□°)╯︵ ┻━┻`,
    `(˚Δ˚)b`, `(ノ*°▽°*)`, `\(^Д^)/`, `\(o_o)/`, `(>_<)`, `(^-^*)`
  ];

  constructor() { }

  ngOnInit() {
    this.face = this.emojis[Math.floor(Math.random()*this.emojis.length)];
  }

}
