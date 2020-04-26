import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/app/modules/core/services/agent.service';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agent-status',
  templateUrl: './agent-status.component.html',
  styleUrls: ['./agent-status.component.scss']
})
export class AgentStatusComponent implements OnInit {

  isAlive$: Observable<boolean>;

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.isAlive$ = timer(0, 60000).pipe(
      switchMap(() => this.agentService.isAlive())
    );
  }
}
