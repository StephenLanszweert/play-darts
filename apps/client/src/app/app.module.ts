import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UiKitModule } from '@playdarts/ui-kit';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  imports: [BrowserModule, BrowserAnimationsModule, UiKitModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
