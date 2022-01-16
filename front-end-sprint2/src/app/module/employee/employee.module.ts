import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {EmployeeRoutingModule} from './employee-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {ViewEmployeeComponent} from './view-employee/view-employee.component';
import {DeleteEmployeeComponent} from './delete-employee/delete-employee.component';

import {RouterModule} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import { EditInformationEmployeeComponent } from './edit-information-employee/edit-information-employee.component';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ListEmployeeComponent, ViewEmployeeComponent, DeleteEmployeeComponent,
    CreateEmployeeComponent, EditEmployeeComponent, EditInformationEmployeeComponent],
  exports: [
    ListEmployeeComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    RouterModule,
    MatInputModule
  ],
  providers: [CurrencyPipe]
})
export class EmployeeModule {
}
