import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

const agent = environment.agent;

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  triggerPlay(fileRelPath: string): Observable<boolean> {
    const endpoint = `${agent}/play`;
    const payload = new HttpParams().set('file', fileRelPath);
    return this.http.post(endpoint, payload, { observe: 'response', responseType: 'text'})
      .pipe(map(resp => {
        return resp.status === 200;
      }));
  }
}
