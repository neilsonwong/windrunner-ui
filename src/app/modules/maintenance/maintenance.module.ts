import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { StatBlockComponent } from './components/stat-block/stat-block.component';
import { LogDisplayComponent } from './components/log-display/log-display.component';



@NgModule({
  declarations: [MaintenanceComponent, StatBlockComponent, LogDisplayComponent],
  imports: [
    CommonModule
  ]
})
export class MaintenanceModule { }
