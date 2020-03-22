import { DocumentReference, QuerySnapshot } from '@angular/fire/firestore';
import { Vendor } from '../models/vendor';

export interface IVendorService {
  allVendors(): Promise<QuerySnapshot<any>>;
  createVendor(vendor: Vendor): Promise<DocumentReference>;
}
