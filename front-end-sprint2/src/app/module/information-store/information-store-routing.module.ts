import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StorePageComponent} from './store-layout/store-page/store-page.component';
import {HistoryStoreComponent} from './store-manager/history-store/history-store.component';
import {EditContractComponent} from '../contract/edit-contract/edit-contract.component';
import {ListTenContractComponent} from './store-manager/list-ten-contract/list-ten-contract.component';
import {EditHistoryComponent} from '../contract/edit-history/edit-history.component';


const routes: Routes = [
  {
    path: '', component: StorePageComponent,
    children: [
      {path: 'information-store/history-store', component: HistoryStoreComponent},
      {path: 'information-store/edit-contract/:id', component: EditContractComponent},
      {path: 'information-store/list-ten-contract', component: ListTenContractComponent},
      {path: 'information-store/edit-history/:id', component: EditHistoryComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class InformationStoreRoutingModule {
}
