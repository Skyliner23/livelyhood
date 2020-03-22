import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.scss'],
})
export class StoreProductsComponent implements OnInit {

  latestBranch = null;
  latestService = null;
  latestProduct = null;

  productsInfo = {
    branches: [],
    products: [],
    services: []
  };

  constructor() { }

  ngOnInit() { }

  submitProductsInfo() {
    console.log('Current state of products info:', this.productsInfo);
  }

  addBranch() {
    this.productsInfo.branches.push(this.latestBranch);
    this.latestBranch = null
  }

  addProduct() {
    this.productsInfo.products.push(this.latestProduct);
    this.latestProduct = null
  }

  addService() {
    this.productsInfo.services.push(this.latestService);
    this.latestService = null
  }

}
