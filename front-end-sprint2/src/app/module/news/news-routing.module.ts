import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NewsListComponent} from './news-list/news-list.component';
import {NewsCreateComponent} from './news-create/news-create.component';
import {AuthGuard} from '../../security/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: NewsListComponent
  },
  {
    path: 'create',
    component: NewsCreateComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
