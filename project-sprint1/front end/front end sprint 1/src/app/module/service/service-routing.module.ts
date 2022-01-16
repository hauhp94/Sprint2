import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicesCreateComponent} from './services-create/services-create.component';
import {ServicesEditComponent} from './services-edit/services-edit.component';
import {ServicesListComponent} from './services-list/services-list.component';
import {AuthModGuard} from "../account/auth-mod.guard";


const routes: Routes = [
  {path: 'list', component: ServicesListComponent,canActivate: [AuthModGuard]},
  {
    path: 'create',
    component: ServicesCreateComponent,canActivate: [AuthModGuard]
  },
  {
    path: 'edit/:id',
    component: ServicesEditComponent,canActivate: [AuthModGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {
}
