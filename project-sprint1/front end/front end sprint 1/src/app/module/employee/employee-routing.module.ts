import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {AuthGuard} from "../account/auth.guard";

const routes: Routes = [
  {
    path: 'employee/list',
    component: ListEmployeeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'employee/create',
    component: CreateEmployeeComponent
  }, {
    path: 'employee/edit/:id',
    component: EditEmployeeComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
