import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateLiquidationContractComponent} from './create-liquidation-contract/create-liquidation-contract.component';
import {ChooseLiquidationComponent} from './choose-liquidation/choose-liquidation.component';
import {ContractRoutingModule} from './contract-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChooseCustomerComponent} from './choose-customer/choose-customer.component';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {PaymentContractComponent} from './payment-contract/payment-contract.component';
import {ChooseContractComponent} from './choose-contract/choose-contract.component';
import {CreateContractComponent} from './create-contract/create-contract.component';
import {DeleteContractComponent} from './delete-contract/delete-contract.component';
import {DetailContractComponent} from './detail-contract/detail-contract.component';
import {EditContractComponent} from './edit-contract/edit-contract.component';
import {EditHistoryComponent} from './edit-history/edit-history.component';
import {DetailProductComponent} from './detail-product/detail-product.component';


@NgModule({
  declarations: [CreateLiquidationContractComponent, ChooseLiquidationComponent,
    ChooseCustomerComponent, PaymentContractComponent, ChooseContractComponent,
    CreateContractComponent, DeleteContractComponent, DetailContractComponent,
    EditContractComponent, EditHistoryComponent, DetailProductComponent],
  exports: [
    CreateLiquidationContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule,
  ]
})
export class ContractModule {
}
