import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {AuthGuard} from '../../security/auth.guard';



const routes: Routes = [
  {
    path: 'create',
    component: CreateEmployeeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: ListEmployeeComponent, canActivate: [AuthGuard]
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EmployeeRoutingModule {
}
