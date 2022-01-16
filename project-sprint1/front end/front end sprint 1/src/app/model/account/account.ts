import {Role} from './role';
import {Category} from '../category/category';

export interface Account {
  accountId: number;
  username: string;
  password: string;
  role: Role;
  category: Category;
}
