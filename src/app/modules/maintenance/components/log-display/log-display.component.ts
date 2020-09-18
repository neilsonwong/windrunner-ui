import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogMessage } from 'src/app/modules/shared/models/LogMessage';

@Component({
  selector: 'app-log-display',
  templateUrl: './log-display.component.html',
  styleUrls: ['./log-display.component.scss']
})
export class LogDisplayComponent implements OnInit {
  @Input() consoleStream: Observable<LogMessage>;

  public console$: Observable<LogMessage>;
  public lines: LogMessage[] = [];

  constructor() { }

  ngOnInit() {
    this.console$ = this.consoleStream.pipe(
      tap(log => this.lines.unshift(log))
    );
  }

  clearLogs() {
    this.lines = [];
  }
}
