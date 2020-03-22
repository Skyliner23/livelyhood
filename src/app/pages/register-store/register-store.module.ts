import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterStorePageRoutingModule } from './register-store-routing.module';

import { RegisterStorePage } from './register-store.page';
import { StoreContactComponent } from './store-contact/store-contact.component';
import { StoreProductsComponent } from './store-products/store-products.component';
import { HttpClientModule } from '@angular/common/http';
import { VendorService } from 'src/app/services/vendor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterStorePageRoutingModule,
    HttpClientModule
  ],
  declarations: [
    RegisterStorePage,
    StoreProductsComponent,
    StoreContactComponent
  ],
  providers: [
    VendorService
  ]
})
export class RegisterStorePageModule { }
