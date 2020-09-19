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
      oboeStream.node("!", item => obs.next(item));
      // stream.done(obs.complete);
      obs.add((e) => { 
        oboeStream.abort();
      });
      oboeStream.fail((e) => {
        obs.error('oboe stream failed');
      });
    });
  }
}