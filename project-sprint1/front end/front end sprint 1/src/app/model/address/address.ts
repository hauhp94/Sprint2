import {Province} from './province';
import {District} from './district';
import {Commune} from './commune';

export interface Address {
  addressId: number;
  province: Province;
  district: District;
  commune: Commune;
}
