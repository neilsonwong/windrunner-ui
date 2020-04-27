import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-rotating-text',
  templateUrl: './rotating-text.component.html',
  styleUrls: ['./rotating-text.component.scss']
})
export class RotatingTextComponent implements OnInit, OnDestroy {
  @Input() texts: Array<string>;

  sub: Subscription;

  index: number = 0;
  fadingOut: boolean = false;
  fadingIn: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.texts.length > 1) {
      this.sub = interval(5000).pipe(
        tap(() => {
          this.fadingOut = true; 
        }),
        delay(250),
        tap(() => this.rotate()),
        delay(250),
        tap(() => {
          this.fadingIn = false; 
        })
      ).subscribe();
    }
  }

  rotate() {
    this.index = (this.index + 1) % this.texts.length;
    this.fadingOut = false; 
    this.fadingIn = true; 
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
