import { Observable, of, throwError } from 'rxjs';
import { FileListService } from './file-list.service';
import { Injectable } from '@angular/core';
import { delay, switchMap, retry, tap, catchError, take } from 'rxjs/operators';
import PromiseStatus from '../../shared/models/PromiseStatus';

@Injectable({
  providedIn: 'root'
})
export class PendingResourceRetrievalService {

  constructor(private fileListService: FileListService) { }

  public waitForPromised<T = any>(promised: string, tryGetResource: Observable<T>): Observable<T> {
    if (promised) {
      // we have a promise waiting for us, let's get it and refresh the details
      // wait 3 seconds and try again

      return this.retryGetResource<T>(promised, tryGetResource, 10).pipe(
        take(1),
        catchError(val => {
          console.log(`${val}: Retried 10 times then quit!`);
          return of(null);
        })
      );
    }
    return of(null);
  }

  private retryGetResource<T = any>(promised: string, tryGetResource: Observable<T>, retryXTimes: number): Observable<T> {
    return of('').pipe(
      delay(this.randomDelay()),
      switchMap(() => this.fileListService.getPromiseStatus(promised)),
      switchMap((result: PromiseStatus) =>
        (result.completed) ?
          tryGetResource :
          throwError('Promise Not Ready!')
      ),
      retry(retryXTimes)
      // tap((updated: T) => console.log(updated)),
    );
  }

  private randomDelay(): number {
    //random delay between 1s and 5s
    return 500 + Math.floor(Math.random() * 2000);
  }
}