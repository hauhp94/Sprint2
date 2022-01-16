import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ChangPassWordComponent} from './chang-pass-word/chang-pass-word.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'login/changPassword/:username', component: ChangPassWordComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {
}
