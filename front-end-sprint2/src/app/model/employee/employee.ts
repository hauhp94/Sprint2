import {Gender} from '../gender/gender';
import {Account} from '../account/account';

export interface Employee {
  employeeId: number;
  address: string;
  birthDate: string;
  email: string;
  employeeCode: string;
  flag: number;
  idCard: string;
  image: string;
  name: string;
  phone: string;
  salary: string;
  account: Account;
  gender: Gender;
}
