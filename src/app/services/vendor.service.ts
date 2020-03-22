import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  async getVendorById(id: string): Promise<Vendor> {
    const vendor = await this.db
      .collection('vendors')
      .doc(id)
      .get()
      .toPromise();

    return {
      id: vendor.id,
      ...vendor.data(),
    } as Vendor;
  }

  async createVendor(vendor: Vendor): Promise<string> {
    delete vendor.id;
    const newVendor = await this.db.collection('vendors').add(vendor);
    return newVendor.id;
  }

  updateVendor(vendor: Vendor) {
    const id = vendor.id;
    delete vendor.id;
    this.db.doc('vendors/' + id).update(vendor);
  }

  deleteVendor(vendorId: string) {
    this.db.doc('vendors/' + vendorId).delete();
  }

  getVendorsByZipCodeAndBranche(
    zipCode: BehaviorSubject<string | null>,
    branche: BehaviorSubject<string | null>
  ): Observable<Vendor[]> {
    return combineLatest(zipCode, branche).pipe(
      switchMap(([zipCodeFilter, brancheFilter]) =>
        this.db
          .collection('vendors', ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;
            if (zipCodeFilter) {
              query = query.where('contactInfo.zipCode', '==', zipCodeFilter);
            }
            if (brancheFilter) {
              query = query.where('business.businessName', '==', brancheFilter);
            }
            return query;
          })
          .valueChanges()
      )
    ) as Observable<Vendor[]>;
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
