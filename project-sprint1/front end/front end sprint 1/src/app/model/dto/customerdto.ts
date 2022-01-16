import {Address} from "../address/address";
import {Account} from "../account/account";

export class CustomerDto {
  customerId: number;
  email: string;
  code: string;
  dateOfBirth: string;
  fullName: string;
  phone: string;
  address: Address;
  account: Account

}
