import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as oboe from 'oboe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OboeWrapper {
  constructor() { }

  get<T>(params: any): Observable<T>;

  get(params: any): Observable<any> {
    const oboeStream = oboe(params);
    return new Observable((obs) => {
      oboeStream.start((status, headers) => {
        switch (status) {
          case 400:
          case 401:
          case 403:
          case 404:
            // errors
            // throw an observable error
            const e = new HttpErrorResponse({
              error: `oboe stream returned ${status}`,
              headers: null, 
              status: status,
              statusText: '',
              url: oboeStream.source
            });

            obs.error(e);
            break;
          case 200:
          default:
        }
      });

      oboeStream.node("!", item => obs.next(item));
      // stream.done(obs.complete);
      oboeStream.fail((e) => {
        console.log(e);
        obs.error(e);
      });
      // abort the stream if the observable is unsubscribed
      obs.add((e) => { 
        oboeStream.abort();
      });
    });
  }
}