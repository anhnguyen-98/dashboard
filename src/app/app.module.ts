import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCheckboxModule } from '@angular/material/checkbox'

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    SimpleCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
