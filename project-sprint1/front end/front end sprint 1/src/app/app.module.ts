import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {GameModule} from './module/game/game.module';
// @ts-ignore
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {ClientModule} from './module/client/client.module';
import {CustomerModule} from './module/customer/customer.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {HttpClientModule} from '@angular/common/http';
import {AccountModule} from './module/account/account.module';
import {ComputerModule} from './module/computer/computer.module';
import {EmployeeModule} from './module/employee/employee.module';
import {OrderDetailModule} from './module/order-detail/order-detail.module';
import {ServiceModule} from './module/service/service.module';
import {RouterModule} from '@angular/router';
import {StatisticModule} from './module/statistic/statistic.module';
import {MessageModule} from './module/message/message.module';
import {MessageRoutingModule} from './module/message/message-routing.module';
import {OrderModule} from './module/order/order.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    AccountModule,
    ClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    EmployeeModule,
    GameModule,
    OrderDetailModule,
    ServiceModule,
    RouterModule,
    StatisticModule,
    CustomerModule,
    ComputerModule,
    MessageModule,
    MessageRoutingModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
