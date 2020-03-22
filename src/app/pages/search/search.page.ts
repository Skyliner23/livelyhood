import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private vendors: Vendor[];

  constructor(private vendorService: VendorService,
    private router: Router) {}

  async ngOnInit() {
    await this.vendorService
      .getVendors()
      .subscribe(data => (this.vendors = data));
  }

  openProfile(vendorId: number){
    this.router.navigateByUrl(`search/${vendorId}`);
  }

}
