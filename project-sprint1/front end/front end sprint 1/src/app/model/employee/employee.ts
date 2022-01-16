import {Address} from '../address/address';
import {Gender} from '../customer/gender';
import {Position} from './position';

export interface Employee {
  employeeId: number;
  code: string;
  fullName: string;
  position: Position;
  gender: Gender;
  email: string;
  dateOfBirth: string;
  startWorkDate: string;
  address: Address;
  phone: string;
  account: Account;
  level: number;
  yearOfExp: number;
  flagDel: number;
  image: string;
  msgStartWorkDate?: string;
  msgDateOfBirth?: string;
  msgCode?: string;
  msgEmail?: string;
  status?: boolean;
  msgPassword?: string;
}
