import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    TopNavbarComponent
  ],
  exports: [
    TopNavbarComponent
  ]
})

export class LayoutModule {

}
