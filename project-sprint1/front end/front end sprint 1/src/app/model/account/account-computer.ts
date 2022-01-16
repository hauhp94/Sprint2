import {Computer} from '../computer/computer';

export interface AccountComputer {
  accountComputerId: number;
  account: Account;
  computer: Computer;
  timeUsed: string;
  timeLogin: string;
  timeLogout: string;
}
