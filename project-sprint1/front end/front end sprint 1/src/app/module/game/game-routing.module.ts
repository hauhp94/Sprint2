import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameCreateComponent} from './game-create/game-create.component';
import {GameEditComponent} from './game-edit/game-edit.component';
import {GameListComponent} from './game-list/game-list.component';
import {AuthGuard} from "../account/auth.guard";
import {AuthModGuard} from "../account/auth-mod.guard";



const routes: Routes = [
  {
    path: '',
    component: GameListComponent
  },
  {
    path: 'game-create',
    component: GameCreateComponent,canActivate: [AuthModGuard]
  },
  {
    path: 'game-edit/:id',
    component: GameEditComponent,canActivate: [AuthModGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
