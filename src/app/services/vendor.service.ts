import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { Vendor } from '../models/vendor';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private db: AngularFirestore) {}

  async allVendors(): Promise<QuerySnapshot<any>> {
    return await this.db
      .collection('vendors')
      .get()
      .toPromise();
  }

  async createVendor(vendor: Vendor): Promise<DocumentReference> {
    return await this.db.collection('vendors').add({ ...vendor });
  }
}
