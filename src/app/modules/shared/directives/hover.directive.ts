import { Directive, HostListener, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, merge, race, Subscription, of } from 'rxjs';
import { takeUntil, delay, switchMap, filter, tap, distinctUntilChanged } from 'rxjs/operators';

const EVENT_MOUSE_ENTER = 'mouseenter';
const EVENT_MOUSE_LEAVE = 'mouseleave';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective implements OnInit, OnDestroy {
  @Output() hoverChange: EventEmitter<boolean> = new EventEmitter();

  private mouseEnter$: Subject<boolean> = new Subject();
  private mouseOut$: Subject<boolean> = new Subject();
  // public hover$: Subject<boolean> = new Subject();
  private subcription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subcription = this.mouseEnter$.pipe(
      switchMap(() => merge(this.mouseOut$, 
        of(true).pipe(
          delay(1000),
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
  private onMouseEnter() {
    this.mouseEnter$.next(true);
  }

  @HostListener(EVENT_MOUSE_LEAVE)
  private onMouseLeave() {
    this.mouseOut$.next(false);
  }

  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.unsubscribe();
    }
  }
}
