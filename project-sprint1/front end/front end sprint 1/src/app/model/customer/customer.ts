import {Address} from '../address/address';
import {CustomerStatus} from './customer-status';
import {Gender} from './gender';
import {Account} from "../account/account";

export interface Customer {
  customerId: number;
  code: string;
  account: Account;
  fullName: string;
  email: string;
  dateOfBirth: string;
  address: Address;
  phone: string;
  status: CustomerStatus;
  flag: number;
  gender: Gender;
}
