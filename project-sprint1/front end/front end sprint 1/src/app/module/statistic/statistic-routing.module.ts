import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StatisticComponent} from './statistic/statistic.component';
import {AuthGuard} from "../account/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: StatisticComponent,canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
