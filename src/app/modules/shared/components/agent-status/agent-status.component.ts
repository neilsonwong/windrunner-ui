import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/modules/core/services/agent.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agent-status',
  templateUrl: './agent-status.component.html',
  styleUrls: ['./agent-status.component.scss']
})
export class AgentStatusComponent implements OnInit {
  public isAlive$: Observable<boolean>;

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.isAlive$ = this.agentService.heartbeat$;
  }
}
