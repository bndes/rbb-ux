import { NgModule , ModuleWithProviders} from '@angular/core';
import { RbbuxComponent } from './rbbux.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';

import { RbbuxConfig } from "./rbbux-config";
import { RBBUX_CONFIG } from "./rbbux.config.token";


@NgModule({
  declarations: [RbbuxComponent, HeaderComponent, FooterComponent, UploadComponent],
  imports: [
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    CommonModule,
    BrowserModule,
    FileUploadModule
  ],
  exports: [RbbuxComponent, HeaderComponent, FooterComponent, UploadComponent]
})
export class RbbuxModule {
  static forRoot(rbbuxConfig: RbbuxConfig): ModuleWithProviders {
    return {
      ngModule: RbbuxModule,
      providers: [
        {
          provide: RBBUX_CONFIG,
          useValue: rbbuxConfig
        }
      ]
    };
  }

}
