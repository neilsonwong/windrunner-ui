import { Injectable } from '@angular/core';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap, shareReplay, catchError, tap, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AGENT_ROUTES } from '../routes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  public heartbeat$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.heartbeat$ = timer(1, environment.agentHeartbeatInterval).pipe(
      switchMap(() => this.isAlive()),
      distinctUntilChanged(),
      shareReplay(),
    );
  }

  public triggerPlay(rel: string): Observable<boolean> {
    const endpoint = AGENT_ROUTES.PLAY;
    const payload = new HttpParams().set('file', rel);
    return this.http.post(endpoint, payload, { observe: 'response', responseType: 'text'})
      .pipe(map((resp: HttpResponse<string>) => {
        return resp.status === 200;
      }));
  }

  private isAlive(): Observable<boolean> {
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
}
