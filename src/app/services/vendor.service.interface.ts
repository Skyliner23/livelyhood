import { DocumentReference } from '@angular/fire/firestore';
import { Vendor } from '../models/vendor';

export interface IVendorService {
  allVendors(): Promise<Vendor>;
  createVendor(vendor: Vendor): Promise<DocumentReference>;
}
