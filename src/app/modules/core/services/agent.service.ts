import { Injectable } from '@angular/core';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap, shareReplay, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AGENT_ROUTES } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  heartbeat$: Observable<boolean>;

  constructor(private http: HttpClient) { }

  triggerPlay(rel: string): Observable<boolean> {
    const endpoint = AGENT_ROUTES.PLAY;
    const payload = new HttpParams().set('file', rel);
    return this.http.post(endpoint, payload, { observe: 'response', responseType: 'text'})
      .pipe(map((resp: HttpResponse<string>) => {
        return resp.status === 200;
      }));
  }

  isAlive(): Observable<boolean> {
    const endpoint = AGENT_ROUTES.DOKI;
    return this.http.get(endpoint, { observe: 'response', responseType: 'text' })
      .pipe(
        map((resp: HttpResponse<string>) => {
          return resp.status === 200 && resp.body === 'ドキドキ';
        }),
        catchError(e => {
          return of(false);
        })
      );
  }

  heartBeat(interval: number): Observable<boolean> {
    if (!this.heartbeat$) {
      this.heartbeat$ = timer(0, interval).pipe(
        switchMap(() => this.isAlive()),
        shareReplay()
      );
    }
    return this.heartbeat$;
  }
}
