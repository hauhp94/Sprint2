import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditInformationEmployeeComponent} from './module/employee/edit-information-employee/edit-information-employee.component';
import {HomeComponent} from './layout/home/home.component';
import {HomepageAndPawnRegistrationComponent} from './module/pawn-registration/homepage-and-pawn-registration/homepage-and-pawn-registration.component';
import {MessageComponent} from './message/message/message.component';


const routes: Routes = [
  {
    path: 'employee',
    loadChildren: () => import('./module/employee/employee.module').then(module => module.EmployeeModule)
  },
  {path: 'message', component: MessageComponent},
  {path: '', component: HomepageAndPawnRegistrationComponent},
  {
    path: 'news',
    loadChildren: () => import('./module/news/news.module').then(module => module.NewsModule)
  },
  {path: 'information', component: EditInformationEmployeeComponent},
  {
    path: 'customer',
    loadChildren: () => import('../app/module/customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./module/statistic/statistic.module').then(module => module.StatisticModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
