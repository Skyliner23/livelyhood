import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private vendors: Vendor[];

  constructor(private vendorService: VendorService) {}

  async ngOnInit() {
    await this.vendorService
      .getVendors()
      .subscribe(data => (this.vendors = data));
  }

}
