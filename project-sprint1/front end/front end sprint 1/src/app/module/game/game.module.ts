import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameEditComponent} from './game-edit/game-edit.component';
import {GameCreateComponent} from './game-create/game-create.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GameRoutingModule} from './game-routing.module';
import {GameListComponent} from './game-list/game-list.component';
import {GameDeleteDialogComponent} from './game-delete-dialog/game-delete-dialog.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from 'ngx-toastr';
import {GameTrailerComponent} from './game-trailer/game-trailer.component';
import {GameDetailComponent} from './game-detail/game-detail.component';


@NgModule({
  declarations: [GameEditComponent, GameCreateComponent, GameListComponent, GameDeleteDialogComponent,
    GameTrailerComponent, GameDetailComponent],
  exports: [
    GameCreateComponent,
    GameEditComponent,
    GameListComponent,
    GameDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    GameRoutingModule,
    CKEditorModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    FormsModule,
  ]
})
export class GameModule {
}
