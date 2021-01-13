import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent, RbblibModule } from "rbblib";
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RbblibModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
