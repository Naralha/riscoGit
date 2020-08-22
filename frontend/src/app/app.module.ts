import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpConfigInterceptor } from './core/interceptors/httpconfig.interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './modules/home/home.component';
import { MacroProcessoListComponent } from './modules/macro-processo-list/macro-processo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MacroProcessoListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
