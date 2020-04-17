import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FileListService } from './services/file-list.service';
import { BannerService } from './services/banner.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    FileListService,
    BannerService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not pass! CoreModule can only be imported once!!');
    }
  }
}
