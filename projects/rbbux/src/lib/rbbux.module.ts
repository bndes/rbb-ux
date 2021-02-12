import { NgModule } from '@angular/core';
import { RbbuxComponent } from './rbbux.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UploadComponent } from './upload/upload.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';

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
export class RbbuxModule { }
