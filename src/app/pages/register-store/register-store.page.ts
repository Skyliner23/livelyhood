import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';
import { Vendor } from 'src/app/models/vendor';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.page.html',
  styleUrls: ['./register-store.page.scss'],
})
export class RegisterStorePage implements OnInit {

  vendor: Vendor = null;

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    
  }

  registerNewVendor(): void {
    if(this.vendor !== null){
      //this.vendorService.createVendor(this.vendor)
    }
    
  }

}
