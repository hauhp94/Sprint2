import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationStoreRoutingModule } from './information-store-routing.module';
import { StoreContentComponent } from './store-layout/store-content/store-content.component';
import { StorePageComponent } from './store-layout/store-page/store-page.component';
import { HistoryStoreComponent } from './store-manager/history-store/history-store.component';
import {RouterModule} from '@angular/router';
import { ListTenContractComponent } from './store-manager/list-ten-contract/list-ten-contract.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContractModule} from '../contract/contract.module';


@NgModule({
  declarations: [StoreContentComponent, StorePageComponent, HistoryStoreComponent, ListTenContractComponent],
  exports: [
    StorePageComponent
  ],
    imports: [
        CommonModule,
        InformationStoreRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        ContractModule
    ]
})
export class InformationStoreModule { }
