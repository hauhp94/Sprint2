import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestHomepageComponent } from './guest-homepage/guest-homepage.component';
import {ClientRoutingModule} from "./client-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [GuestHomepageComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
  ]
})
export class ClientModule { }
