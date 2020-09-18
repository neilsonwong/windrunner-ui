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
import { OboeObservable } from 'src/app/utils/oboeObservable';

@Injectable({
  providedIn: 'root'
})
export class ServerAdminService {
  constructor(
    private http: HttpClient,
    private oboe: OboeWrapper,
    private authService: AuthService,
    private variableRoutingService: VariableRoutingService) { }

  public getServerLoadStream(): OboeObservable<ServerLoad> {
    const url = this.getRoute(API_ROUTE_OPTIONS.GET_SERVER_LOAD);
    return this.oboe.get<ServerLoad>(this.generateOboeParamsWithAuth(url));
  }

  public getConsoleStream(): OboeObservable<LogMessage> {
    const url = this.getRoute(API_ROUTE_OPTIONS.GET_SERVER_CONSOLE);
    return this.oboe.get<LogMessage>(this.generateOboeParamsWithAuth(url));
  }

  public getServerInfo(): Observable<ServerInfo> {
    const url = this.getRoute(API_ROUTE_OPTIONS.GET_SERVER_INFO);
    return this.http.get<ServerInfo>(url);
  }

  private getRoute(route: string) {
    return this.variableRoutingService.resolveRoute(route);
  }

  private generateOboeParamsWithAuth(url: String) {
    const token = this.authService.getAccessToken();
    return {
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }
}