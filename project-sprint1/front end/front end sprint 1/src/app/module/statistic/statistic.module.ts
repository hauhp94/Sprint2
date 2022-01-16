import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { StatisticComponent } from './statistic/statistic.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StatisticRoutingModule} from './statistic-routing.module';
import {StatisticService} from '../../service/statistic/statistic.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [StatisticComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StatisticRoutingModule,
  ],
  exports: [RouterModule, StatisticComponent],
  providers: [DatePipe, StatisticService]

})
export class StatisticModule { }
