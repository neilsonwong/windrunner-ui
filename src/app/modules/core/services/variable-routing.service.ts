import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AgentService } from './agent.service';
import { tap } from 'rxjs/operators';

const { agent, api, proxyPrefix, apiPrefix } = environment;

const API_ROUTES_ENDINGS = {
    GET_LIST: `/vlist`,
    DEL_FROM_LIST: `/vlist`,
    ADD_TO_LIST: `/vlist`,
    GET_IN_LIST: `/vlist`,
    GET_BROWSE: `/browse`,
    GET_RECENT: `/recent`,
    GET_RECENTLY_CHANGED: `/recent`,
    GET_FILE_DETAILS: `/details`,
    IMG_THUMBNAIL: `/img/thumbs`,
    IMG_SERIES: `/img/series`,
    IMG_PRUNE_THUMBNAIL: `/img/prune`,
    GET_PENDING_RESOURCE_STATUS: `/resource`,
    GET_SERIES_OPTIONS: `/series/options`,
    UPDATE_SERIES_OPTION: `/series`,
    GET_SERVER_LOAD: `/load`,
};

@Injectable({
  providedIn: 'root'
})
export class VariableRoutingService {
    private resolvableApi: string = api;
    
    constructor(private agentService: AgentService) {
        this.agentService.heartBeat(60000).pipe(
            tap((agentAlive: Boolean) => {
                // TODO: hard coded for now, FIX THIS
                this.resolvableApi = agentAlive ? agent + `${proxyPrefix}${apiPrefix}` : api;
            })
        ).subscribe();
    }

    resolveRoute(routeName: string): string {
        if (API_ROUTES_ENDINGS[routeName] !== undefined) {
            return `${this.resolvableApi}${API_ROUTES_ENDINGS[routeName]}`;
        }
        else {
            console.log(`no route with the path "${routeName}" exists`);
        }
    }
}
