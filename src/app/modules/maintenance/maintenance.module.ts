import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { StatBlockComponent } from './components/stat-block/stat-block.component';
import { LogDisplayComponent } from './components/log-display/log-display.component';
import { ToolBoxComponent } from './components/tool-box/tool-box.component';



@NgModule({
  declarations: [MaintenanceComponent, StatBlockComponent, LogDisplayComponent, ToolBoxComponent],
  imports: [
    CommonModule
  ]
})
export class MaintenanceModule { }
