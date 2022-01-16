import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StatisticLiquidationComponent} from './statistic-liquidation/statistic-liquidation.component';
import {StatisticInterestComponent} from './statistic-interest/statistic-interest.component';
import {StatisticExpectedComponent} from './statistic-expected/statistic-expected.component';



const routes: Routes = [
  {
    path: 'liquidation',
    component: StatisticLiquidationComponent
  },
  {
    path: 'interest',
    component: StatisticInterestComponent
  },
  {
    path: 'expected',
    component: StatisticExpectedComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class StatisticRoutingModule { }
