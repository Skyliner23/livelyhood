import { IVendor } from './vendor.interface';

export class Vendor implements IVendor {
  constructor(public name: string) {}
}
