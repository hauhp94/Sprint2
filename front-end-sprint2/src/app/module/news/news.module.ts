import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewsRoutingModule} from './news-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from 'ngx-toastr';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";



@NgModule({
  declarations: [NewsListComponent, NewsCreateComponent],
  exports: [
   NewsListComponent,
    NewsCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NewsRoutingModule,
    CKEditorModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    FormsModule,
  ]
})
export class NewsModule { }
