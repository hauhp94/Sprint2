import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateLiquidationContractComponent} from './create-liquidation-contract/create-liquidation-contract.component';
import {PaymentContractComponent} from './payment-contract/payment-contract.component';
import {EditHistoryComponent} from './edit-history/edit-history.component';
import {CreateContractComponent} from './create-contract/create-contract.component';


const routes: Routes = [
  {path: 'create-liquidation-contract', component: CreateLiquidationContractComponent},
  {path: 'payment-contract', component: PaymentContractComponent},
  {path: 'edit-history/:id', component: EditHistoryComponent},
  {
    path: 'create-contract',
    component: CreateContractComponent
  }



  ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ContractRoutingModule { }
