import {Gender} from '../gender/gender';

export interface Customer {
  customerId: number;
  address: string;
  birthDate: string;
  customerCode: string;
  email: string;
  flag: number;
  idCard: string;
  image: string;
  name: string;
  phone: string;
  gender: Gender;
}
