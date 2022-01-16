import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateComputerComponent} from "./create-computer/create-computer.component";
import {EditComputerComponent} from "./edit-computer/edit-computer.component";
import {ComputerListComponent} from "./computer-list/computer-list.component";
import {AuthModGuard} from "../account/auth-mod.guard";

/*long-computer*/
const routes: Routes = [
  {path: 'create-computer', component: CreateComputerComponent,canActivate: [AuthModGuard]},
  {path: 'update-computer/:id', component: EditComputerComponent,canActivate: [AuthModGuard]},
  {
    path: 'computer-list',
    component: ComputerListComponent,canActivate: [AuthModGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputerRoutingModule {
}
