import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FileListService } from './services/file-list.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule
  ],
  providers: [
    FileListService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not pass! CoreModule can only be imported once!!');
    }
  }
}
