import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
import {StatisticLiquidationComponent} from './statistic-liquidation/statistic-liquidation.component';
import { StatisticInterestComponent } from './statistic-interest/statistic-interest.component';
import { StatisticExpectedComponent } from './statistic-expected/statistic-expected.component';
import {RouterModule} from '@angular/router';
import {StatisticRoutingModule} from './statistic-routing.module';
import {StatisticService} from '../../service/statistic/statistic.service';

@NgModule({
  declarations: [ StatisticLiquidationComponent, StatisticInterestComponent, StatisticExpectedComponent],
  exports: [
    StatisticLiquidationComponent,
    StatisticExpectedComponent,
    StatisticInterestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    RouterModule,
    StatisticRoutingModule,
    FormsModule
  ],
  providers: [DatePipe, StatisticService]

})
export class StatisticModule { }
