import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Vendor } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-test-database',
  templateUrl: './test-database.page.html',
  styleUrls: ['./test-database.page.scss'],
})
export class TestDatabasePage implements OnInit {
  items$: Vendor[];
  sizeFilter$: BehaviorSubject<string | null>;
  colorFilter$: BehaviorSubject<string[] | null>;

  vendors: Vendor[];
  constructor(
    private vendorService: VendorService,
    private afs: AngularFirestore
  ) {
    this.sizeFilter$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);
    this.vendorService
      .getVendorsByZipCodeAndBranches(this.sizeFilter$, this.colorFilter$)
      .subscribe(data => {
        this.items$ = data;
        console.log('DATEN!!');
      });
  }

  async ngOnInit() {
    await this.vendorService
      .getVendors()
      .subscribe(data => (this.vendors = data));
  }

  filterBySize(size: string | null) {
    if (size) {
      this.sizeFilter$.next('30');
    } else {
      this.sizeFilter$.next(size);
    }
  }
  filterByColor(color: string | null) {
    if (color) {
      this.colorFilter$.next(['Restaurant', 'online']);
    } else {
      this.colorFilter$.next(null);
    }
  }

  create() {
    const vendor = {
      business: { businessName: 'TestBusiness' },
      contactInfo: {},
      products: [],
      services: [],
    } as Vendor;
    this.vendorService.createVendor(vendor);
  }

  update(vendor: Vendor) {
    vendor.business.businessName = vendor.business.businessName + 'Update';
    this.vendorService.updateVendor(vendor);
  }

  delete(id: string) {
    this.vendorService.deleteVendor(id);
  }

  async vendorById(id: string) {
    const vendor = await this.vendorService.getVendorById(id);
    console.log(vendor);
  }
}
