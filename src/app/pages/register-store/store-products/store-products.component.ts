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


  addBranch() {
    this.productsInfo.branches.push(this.latestBranch);
    this.latestBranch = null
  }
  removeBranch(branchName)
  {
    this.productsInfo.branches.forEach( (item, index) => {
      if(item === branchName) this.productsInfo.branches.splice(index,1);
    });
    
  }
  addProduct() {
    this.productsInfo.products.push(this.latestProduct);
    this.latestProduct = null
  }
  removeProduct(productName)
  {
    this.productsInfo.products.forEach( (item, index) => {
      if(item === productName) this.productsInfo.products.splice(index,1);
    });
    
  }

  addService() {
    this.productsInfo.services.push(this.latestService);
    this.latestService = null
  }

}
