import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTE_OPTIONS } from '../routes';
import ServerLoad from '../../shared/models/ServerLoad';
import { VariableRoutingService } from './variable-routing.service';
import { OboeWrapper } from 'src/app/utils/oboeWrapper';
import ServerInfo from '../../shared/models/ServerInfo';
import { AuthService } from './auth.service';
import { LogMessage } from '../../shared/models/LogMessage';
import { ResultData } from '../../shared/models/GenericData';
import { distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const { api, apiPrefix } = environment;

@Injectable({
  providedIn: 'root'
})
export class ServerAdminService {
  constructor(
    private http: HttpClient,
    private oboe: OboeWrapper,
    private authService: AuthService,
    private variableRoutingService: VariableRoutingService) { }

  // TODO: Currently agent doesn't play well with streams
  // we'll just have to skip agent proxy for these calls

  public getServerLoadStream(): Observable<ServerLoad> {
    // const url = this.getRoute(API_ROUTE_OPTIONS.GET_SERVER_LOAD);
    const url = `${api}${apiPrefix}${API_ROUTE_OPTIONS.GET_SERVER_LOAD}`;
    return this.oboe.get<ServerLoad>(this.generateOboeParamsWithAuth(url)).pipe(
      distinctUntilChanged()
    );
  }

  public getConsoleStream(): Observable<LogMessage> {
    // const url = this.getRoute(API_ROUTE_OPTIONS.GET_SERVER_CONSOLE);
    const url = `${api}${apiPrefix}${API_ROUTE_OPTIONS.GET_SERVER_CONSOLE}`;
    return this.oboe.get<LogMessage>(this.generateOboeParamsWithAuth(url));
  }

  public getServerInfo(): Observable<ServerInfo> {
    const url = this.getRoute(API_ROUTE_OPTIONS.GET_SERVER_INFO);
    return this.http.get<ServerInfo>(url);
  }

  public pruneThumbnails(): Observable<any> {
    const url = this.getRoute(API_ROUTE_OPTIONS.IMG_PRUNE_THUMBNAIL);
    return this.http.post<ResultData>(url, {});
  }

  private getRoute(route: string) {
    return this.variableRoutingService.resolveRoute(route);
  }

  private generateOboeParamsWithAuth(url: string) {
    const token = this.authService.getAccessToken();
    return {
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
}