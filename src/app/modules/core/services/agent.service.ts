import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AGENT_ROUTES } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  triggerPlay(rel: string): Observable<boolean> {
    const endpoint = AGENT_ROUTES.PLAY;
    const payload = new HttpParams().set('file', rel);
    return this.http.post(endpoint, payload, { observe: 'response', responseType: 'text'})
      .pipe(map(resp => {
        return resp.status === 200;
      }));
  }

  isAlive(): Observable<boolean> {
    const endpoint = AGENT_ROUTES.DOKI;
    return this.http.get(endpoint, { observe: 'response', responseType: 'text' })
      .pipe(map(resp => {
        return resp.status === 200 && resp.body === 'ドキドキ';
      }));
  }

  heartBeat(interval: number): Observable<boolean> {
    return timer(0, interval).pipe(
      switchMap(() => this.isAlive()),
      shareReplay()
    );
  }
}
