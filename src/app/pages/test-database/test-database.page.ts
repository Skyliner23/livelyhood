import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-test-database',
  templateUrl: './test-database.page.html',
  styleUrls: ['./test-database.page.scss'],
})
export class TestDatabasePage implements OnInit {
  constructor(private vendorService: VendorService) {}

  async ngOnInit() {
    console.log(
      await this.vendorService.createVendor({
        business: { businessName: 'TestBusiness' },
        contactInfo: {},
        products: [],
        services: [],
      } as Vendor)
    );
    // try {
    // } catch (error) {
    //   console.error(JSON.stringify(error));
    // }
  }
}
