import {Province} from './province';

export interface District {
  districtId: number;
  name: string;
  province: Province;
}
