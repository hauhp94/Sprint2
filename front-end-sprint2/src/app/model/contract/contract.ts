import {Customer} from '../customer/customer';
import {StatusContract} from './status-contract';
import {TypeContract} from './type-contract';
import {TypeProduct} from './type-product';

export interface Contract {
  contractId: number;
  contractCode: string;
  dateLiquidation: string;
  endDate: string;
  flag: number;
  loan: number;
  productImage: string;
  productName: string;
  profit: number;
  startDate: string;
  totalMoney: number;
  customer: Customer;
  status: StatusContract;
  typeContract: TypeContract;
  typeProduct: TypeProduct;
}
