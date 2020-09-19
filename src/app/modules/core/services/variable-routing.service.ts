import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AgentService } from './agent.service';
import { tap } from 'rxjs/operators';

const { agent, api, proxyPrefix, apiPrefix } = environment;

@Injectable({
  providedIn: 'root'
})
export class VariableRoutingService {
    private resolvableApi: string = `${api}${apiPrefix}`;
    
    constructor(private agentService: AgentService) {
        this.agentService.heartBeat(60000).pipe(
            tap((agentAlive: Boolean) => {
                this.resolvableApi = agentAlive ? `${agent}${proxyPrefix}${apiPrefix}` : `${api}${apiPrefix}`;
            })
        ).subscribe();
    }

    public resolveRoute(routeName: string): string {
        if (routeName !== undefined) {
            return `${this.resolvableApi}${routeName}`;
        }
        else {
            console.log(`no route with the path "${routeName}" exists`);
        }
    }
}
