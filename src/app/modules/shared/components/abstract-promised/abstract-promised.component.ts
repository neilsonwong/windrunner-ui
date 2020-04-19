import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FileKind } from 'src/app/modules/shared/models/Files';
import { FileListService } from 'src/app/modules/core/services/file-list.service';
import { of, Observable, throwError, Subscription } from 'rxjs';
import { switchMap, retry, tap, delay } from 'rxjs/operators';
import PromiseStatus from 'src/app/modules/shared/models/PromiseStatus';

@Component({ template: '' })
export class AbstractPromisedComponent<T = any> implements OnDestroy {
  promised: string;
  retry$: Subscription;

  constructor(protected fileListService: FileListService) { }

  protected waitForPromised(promised: string) {
    if (promised) {
      this.promised = promised;
      // we have a promise waiting for us, let's get it and refresh the details
      // wait 3 seconds and try again

      this.retry$ = this.retryGetResource(10).subscribe({
        error: val => console.log(`${val}: Retried 10 times then quit!`)
      });
    }
  }

  private retryGetResource(retryXTimes): Observable<T> {
    return of('').pipe(
      delay(this.randomDelay()),
      switchMap(() => this.fileListService.getPromiseStatus(this.promised)),
      switchMap((result: PromiseStatus) =>
        (result.completed) ?
          this.tryGetResource() :
          throwError('Promise Not Ready!')
      ),
      retry(retryXTimes),
      // tap((updated: T) => console.log(updated)),
      tap((updated: T) => this.handleUpdatedValue(updated))
    );
  }

  private randomDelay(): number {
    //random delay between 1s and 5s
    return 500 + Math.floor(Math.random() * 2000);
  }

  ngOnDestroy(): void {
    if (this.retry$) {
      this.retry$.unsubscribe();
    }
  }

  // abstract
  protected tryGetResource(): Observable<T> {
    return throwError('abstract tryGetResource called!');
  }

  // abstract
  protected handleUpdatedValue(updated: T): void {
    throw new Error('abstract handle updated value called!');
  }
}