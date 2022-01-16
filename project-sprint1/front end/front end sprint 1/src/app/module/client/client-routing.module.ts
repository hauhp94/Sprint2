import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {GuestHomepageComponent} from "./guest-homepage/guest-homepage.component";
import {AuthGuard} from "../account/auth.guard";

const routes: Routes = [
  {path: 'home', component: GuestHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
