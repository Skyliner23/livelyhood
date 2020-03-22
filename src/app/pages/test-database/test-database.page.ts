import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-test-database',
  templateUrl: './test-database.page.html',
  styleUrls: ['./test-database.page.scss'],
})
export class TestDatabasePage implements OnInit {
  vendors: Vendor[];
  constructor(private vendorService: VendorService) {}

  async ngOnInit() {
    await this.vendorService
      .getVendors()
      .subscribe(data => (this.vendors = data));
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
}
