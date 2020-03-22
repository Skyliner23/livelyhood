import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Vendor } from '../models/vendor';
import { IVendor } from '../models/vendor.interface';
import { IVendorService } from './vendor.service.interface';

@Injectable({
  providedIn: 'root',
})
export class VendorService implements IVendorService {
  constructor(private db: AngularFirestore) {}

  async allVendors(): Promise<Vendor> {
    return await {} as Vendor;
  }

  async createVendor(vendor: IVendor): Promise<DocumentReference> {
    const userId = '';

    return await this.db.collection('vendors').add({ ...vendor });
  }
}
