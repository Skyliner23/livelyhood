import { Component, OnInit } from '@angular/core';
import { Vendor, VendorBusiness, VendorContactInfo, VendorProduct, VendorSocialMedia, VendorProvidedService } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.page.html',
  styleUrls: ['./register-store.page.scss'],
})
export class RegisterStorePage implements OnInit {

  latestBranch = null;
  latestServices: string[] = [];
  latestProduct = null;

  distance;
  instInput;
  vendor: Vendor;

  constructor(vendorService: VendorService){

  }

  ngOnInit() {
    this.vendor = {
      business: {} as VendorBusiness,
      contactInfo: {
        socialMedia: {} as VendorSocialMedia
      } as VendorContactInfo,
      services: [],
      products: []
    }
    this.vendor.contactInfo.socialMedia ={} as VendorSocialMedia;
  }

  registerNewVendor(): void {

    console.log(this.vendor);
    if (this.vendor !== null) {
    }

  }

  updateDistance() {
    document.getElementById("labelDistance").innerHTML = this.distance + " km";
  }

  uploadStoreImg() {
    console.log('test');
  }

  addBranch() {
    if(!this.vendor.business.branches){
      this.vendor.business.branches =[];
    }
    this.vendor.business.branches.push(this.latestBranch);
    this.latestBranch = null
  }

  removeBranch(branchName) {
    this.vendor.business.branches.forEach((item, index) => {
      if (item === branchName) this.vendor.business.branches.splice(index, 1);
    });

  }

  addProduct() {
    this.vendor.products.push({name: this.latestProduct} as VendorProduct);
    this.latestProduct = null
    console.log(this.vendor.products);
  }

  removeProduct(productName) {
    this.vendor.products.forEach((item: VendorProduct, index) => {
      if (item.name === productName) this.vendor.products.splice(index, 1);
    });

  }

  addService() {
    this.vendor.services = this.latestServices.map(s => this.buildServiceElement(s));
  }

  buildServiceElement(serviceName): VendorProduct {
    return {name: serviceName} as VendorProvidedService;
  }

}
