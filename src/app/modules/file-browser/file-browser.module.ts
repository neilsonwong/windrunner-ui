import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ListViewComponent } from './components/list-view/list-view.component';
import { LeafViewComponent } from './components/leaf-view/leaf-view.component';
import { FileBrowserComponent } from './components/file-browser/file-browser.component';

@NgModule({
  declarations: [ListViewComponent, LeafViewComponent, FileBrowserComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FileBrowserComponent
  ]
})
export class FileBrowserModule { }
