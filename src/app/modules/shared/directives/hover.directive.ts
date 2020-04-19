import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit {
  @Input() 
  private mouseEnter$: Subject<Event>;
  private mouseOut$: Subject<Event>;
  private hoverOn$: Observable<any>;

  constructor() {
  }

  ngOnInit() {
    this.hoverOn$ = this.mouseEnter$.pipe(
      delay(500)
      // takeUntil(this.mouseOut$)
    );
  }

  @HostListener('mouseenter', ['$event'])
  private onMouseEnter(e: Event) {
    this.mouseEnter$.next(e);

    // if (this.identified && !this.mouseHere) {
    //   this.mouseHere = true;
    //   timer(500).subscribe(() => {
    //     if (this.mouseHere) {
    //       this.hovered();
    //     }
    //   });
    // }
  }

  @HostListener('mouseleave', ['$event'])
  private onMouseLeave(e: Event) {
    this.mouseOut$.next(e);
  }
}
