import {Order} from './order';
import {Services} from '../service/services';


export class OrderDetail {
  orderDetailId: number;
  order: Order;
  quantity: number;
  totalPrices: number;
  services: Services;

}
