import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'services',
    loadChildren: () => import('./module/service/service.module').then(module => module.ServiceModule)
  },
  {
    path: '',
    loadChildren: () => import('./module/game/game.module').then(module => module.GameModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./module/account/account.module').then(module => module.AccountModule)
  },
  {
    path: 'guest-homepage',
    loadChildren: () => import ('./module/client/client.module').then(module => module.ClientModule)
  },
  {
    path: 'computer',
    loadChildren: () => import('./module/computer/computer.module').then(module => module.ComputerModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./module/statistic/statistic.module').then(module => module.StatisticModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./module/order/order.module').then(module => module.OrderModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./module/order-detail/order-detail.module').then(module => module.OrderDetailModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./module/customer/customer.module').then(module => module.CustomerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
