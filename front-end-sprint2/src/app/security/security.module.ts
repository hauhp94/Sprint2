import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {SecurityRoutingModule} from './security-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import { ChangPassWordComponent } from './chang-pass-word/chang-pass-word.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ChangPassWordComponent],
  exports: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

  ]
})
export class SecurityModule { }
