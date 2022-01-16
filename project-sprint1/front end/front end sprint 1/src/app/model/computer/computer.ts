import {ComputerType} from './type-computer';
import {ComputerManufacturer} from './manufacturer-computer';
import {ComputerStatus} from './status-computer';

export interface Computer {
  computerId: number;
  computerCode: string;
  location: string;
  startUsedDate: string;
  configuration: string;
  warrantyPeriod: string;
  flagDelete: number;
  computerType: ComputerType;
  computerManufacturer: ComputerManufacturer;
  computerStatus: ComputerStatus;
}
