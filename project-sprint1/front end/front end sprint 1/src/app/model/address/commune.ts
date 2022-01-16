import {District} from './district';

export interface Commune {
  communeId: number;
  name: string;
  district: District;
}
