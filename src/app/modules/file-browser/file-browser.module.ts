import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FileBrowserComponent } from './components/file-browser/file-browser.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { LeafListViewComponent } from './components/leaf-list-view/leaf-list-view.component';
import { LeafLineViewComponent } from './components/leaf-line-view/leaf-line-view.component';

@NgModule({
  declarations: [ListViewComponent, LeafListViewComponent, FileBrowserComponent, LeafLineViewComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FileBrowserComponent
  ]
})
export class FileBrowserModule { }
