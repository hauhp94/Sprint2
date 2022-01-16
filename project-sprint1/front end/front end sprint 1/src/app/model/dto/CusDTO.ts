import {Address} from '../address/address';
import {Gender} from '../customer/gender';
import {Account} from '../account/account';
import {CustomerStatus} from "../customer/customer-status";

export interface CusDTO {
  customerId: number;
  fullName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address: Address;
  gender: Gender;
  customerStatus: CustomerStatus;
  account: Account;
  flag: number;
}
