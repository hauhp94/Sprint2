import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EmployeeModule} from './module/employee/employee.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import {HomeComponent} from './layout/home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {SecurityModule} from './security/security.module';
import {NewsModule} from './module/news/news.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {CustomerModule} from './module/customer/customer.module';
import {PawnRegistrationModule} from './module/pawn-registration/pawn-registration.module';
import {MessageComponent} from './message/message/message.component';
import {CheckLoginComponent} from './message/message/check-login/check-login.component';
import {registerLocaleData} from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import {ContractModule} from './module/contract/contract.module';
import {InformationStoreModule} from './module/information-store/information-store.module';
import {StatisticModule} from './module/statistic/statistic.module';
import {NgApexchartsModule} from 'ng-apexcharts';
registerLocaleData(localeVi, 'vi-VN');
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MessageComponent,
    CheckLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    SecurityModule,
    EmployeeModule,
    NewsModule,
    RouterModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule,
    CustomerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    PawnRegistrationModule,
    ContractModule,
    InformationStoreModule,
    StatisticModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
