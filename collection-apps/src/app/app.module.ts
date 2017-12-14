import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    LayoutModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
