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

  getVendorsByZipCodeAndBranches(
    zipCode: BehaviorSubject<string | null>,
    branches: BehaviorSubject<string[] | null>
  ): Observable<Vendor[]> {
    return combineLatest(zipCode, branches).pipe(
      switchMap(([zipCodeFilter, branchesFilter]) =>
        this.db
          .collection('vendors', ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;

            if (branchesFilter) {
              query = query.where(
                'business.branches',
                'array-contains-any',
                branchesFilter
              );
            }
            if (zipCodeFilter) {
              query = query
                .orderBy('contactInfo.zipCode')
                .startAt(zipCodeFilter)
                .endAt(zipCodeFilter + '\uf8ff');
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
