import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { IVendor } from '../models/vendor.interface';
import { IVendorService } from './vendor.service.interface';

@Injectable({
  providedIn: 'root',
})
export class VendorService implements IVendorService {
  constructor(private db: AngularFirestore) {}

  async allVendors(): Promise<QuerySnapshot<any>> {
    return await this.db
      .collection('vendors')
      .get()
      .toPromise();
  }

  async createVendor(vendor: IVendor): Promise<DocumentReference> {
    return await this.db.collection('vendors').add({ ...vendor });
  }
}
