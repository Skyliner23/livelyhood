import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {
  private vendors: Vendor[];

  constructor(private vendorService: VendorService, private router: Router) {}

  async ngOnInit() {
    await this.vendorService
      .getVendors()
      .subscribe(data => (this.vendors = data));
  }

  openProfile(vendorId: number) {
    this.router.navigateByUrl(`marketplace/${vendorId}`);
  }
}
