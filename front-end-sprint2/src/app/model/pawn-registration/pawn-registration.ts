import {TypeProduct} from '../contract/type-product';

export interface PawnRegistration {
  pawnRegistrationId: number;
  address: string;
  description: string;
  email: string;
  nameCustomer: string;
  phone: string;
  registerDate: string;
  status: string;
  typeProduct: TypeProduct;
}
