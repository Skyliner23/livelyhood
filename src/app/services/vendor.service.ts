import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vendor } from '../models/vendor';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private db: AngularFirestore) {}

  getVendors(): Observable<Vendor[]> {
    return Observable.create(observer => {
      this.db
        .collection('vendors')
        .snapshotChanges()
        .subscribe(result => {
          observer.next(
            result.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data(),
              } as Vendor;
            })
          );
        });
    });
  }

  createVendor(vendor: Vendor) {
    return this.db.collection('vendors').add(vendor);
  }

  updateVendor(vendor: Vendor) {
    delete vendor.id;
    this.db.doc('vendors/' + vendor.id).update(vendor);
  }

  deleteVendor(vendorId: string) {
    this.db.doc('vendors/' + vendorId).delete();
  }

  getVendorsForZipCode(zipCode: string): Observable<Vendor[]> {
    return Observable.create(observer => {
      this.db
        .collection('vendors', ref =>
          ref.where('business.contactInfo.zipCode', '==', zipCode)
        )
        .snapshotChanges()
        .subscribe(result => {
          observer.next(
            result.map(e => {
              return {
                id: e.payload.doc.id,
                ...e.payload.doc.data(),
              } as Vendor;
            })
          );
        });
    });
  }
}
