import { Directive, HostListener, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, merge, race, Subscription, of } from 'rxjs';
import { takeUntil, delay, switchMap, filter, tap, distinctUntilChanged } from 'rxjs/operators';

const EVENT_MOUSE_ENTER = 'mouseenter';
const EVENT_MOUSE_LEAVE = 'mouseleave';

@Directive({
  selector: '[hoverable]'
})
export class HoverDirective implements OnInit, OnDestroy {
  @Input() hoverable: number;
  @Output() hoverChange: EventEmitter<boolean> = new EventEmitter();

  private mouseEnter$: Subject<boolean> = new Subject();
  private mouseOut$: Subject<boolean> = new Subject();
  // public hover$: Subject<boolean> = new Subject();
  private subcription: Subscription;

  constructor() { }

  ngOnInit() {
    const hoverTime = this.hoverable || 1000;

    this.subcription = this.mouseEnter$.pipe(
      switchMap(() => merge(this.mouseOut$, 
        of(true).pipe(
          delay(hoverTime),
          takeUntil(this.mouseOut$)
        )
      )),
      distinctUntilChanged(),
      tap((result) => {
        this.hoverChange.emit(result);
        // this.hover$.next(result);
      })
    ).subscribe();
  }

  @HostListener(EVENT_MOUSE_ENTER)
  onMouseEnter() {
    this.mouseEnter$.next(true);
  }

  @HostListener(EVENT_MOUSE_LEAVE)
  onMouseLeave() {
    this.mouseOut$.next(false);
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
