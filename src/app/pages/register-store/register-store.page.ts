import { Component, OnInit } from '@angular/core';
import { Vendor, VendorBusiness, VendorContactInfo, VendorProduct, VendorService } from 'src/app/models/vendor';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.page.html',
  styleUrls: ['./register-store.page.scss'],
})



export class RegisterStorePage implements OnInit {

  latestBranch = null;
  latestService = null;
  latestProduct = null;

  productsInfo = {
    branches: [],
    products: [],
    services: []
  };

  distance;
  instInput;
  vendor: Vendor;

  ngOnInit() {
    this.vendor = {
      business: {} as VendorBusiness,
      contactInfo: {} as VendorContactInfo,
      services: [],
      products: []
    }
  }

  registerNewVendor(): void {
    console.log(this.vendor);
    if (this.vendor !== null) {
      //this.vendorService.createVendor(this.vendor)
    }

  }

  updateDistance() {
    document.getElementById("labelDistance").innerHTML = this.distance + " km";
  }

  uploadStoreImg() {
    console.log('test');
  }

  addBranch() {
    this.productsInfo.branches.push(this.latestBranch);
    this.latestBranch = null
  }

  removeBranch(branchName) {
    this.productsInfo.branches.forEach((item, index) => {
      if (item === branchName) this.productsInfo.branches.splice(index, 1);
    });

  }

  addProduct() {
    this.productsInfo.products.push(this.latestProduct);
    this.latestProduct = null
  }

  removeProduct(productName) {
    this.productsInfo.products.forEach((item, index) => {
      if (item === productName) this.productsInfo.products.splice(index, 1);
    });

  }

  addService() {
    this.productsInfo.services.push(this.latestService);
    this.latestService = null
  }

}
