import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { Vendor, VendorBusiness, VendorProduct, VendorContactInfo } from '../../models/vendor';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.page.html',
  styleUrls: ['./business-profile.page.scss'],
})
export class BusinessProfilePage  implements OnInit {

  vendor: Vendor;

  // TODO inject service for providing data for specific vendor
  constructor(private activatedRoute: ActivatedRoute, private vendorService: VendorService){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(!params.has('businessId')){
        // redirect back to search
        return;
      }
      const businessId = params.get('businessId');
      // TODO call service with specific id
      //this.vendorService.getVendorById(businessId)
      this.createFakeVendor();
    });
  }

  createFakeVendor(){
    this.vendor = new DummyVendor;
    this.vendor.business = new DummyVendorBusiness;
    this.vendor.business.businessName = 'Company 123'
    this.vendor.business.businessDescription = 'Dieses Geschäft macht dies und das und jenes...'
    this.vendor.business.profilePic = 'assets/icon/favicon.png';
    this.vendor.business.branch = ['dies','das','jenes','und noch mehr'];
    this.vendor.contactInfo = new DummyVendorContactInfo;
    this.vendor.contactInfo.email = 'asd@asd.de';
    this.vendor.contactInfo.website = 'lievelyhood.de';
    this.vendor.contactInfo.street = 'Strasse des seeligen Friedens';
    this.vendor.contactInfo.houseNumber = '123a/b';
    this.vendor.contactInfo.zipCode = '12345';
  }

}

// -------------------- fake stuff ----------------------

export class DummyVendor implements Vendor {
  business: import("../../models/vendor").VendorBusiness;  
  contactInfo: import("../../models/vendor").VendorContactInfo;
  products: import("../../models/vendor").VendorProduct[];
  services: import("../../models/vendor").VendorService[];
  name: string;
}

export class DummyVendorBusiness implements VendorBusiness {
  businessName: string;  businessDescription: string;
  businessOwner: string;
  openingHours: string;
  profilePic: string;
  businessRange: string[];
  branch: string[];
}

export class DummyVendorProduct implements VendorProduct {
  name: string;
}

export class DummyVendorContactInfo implements VendorContactInfo {
  street: string;  houseNumber: string;
  zipCode: string;
  telefone: string;
  whatsApp: string;
  email: string;
  website: string;
  socialMedia?: import("../../models/vendor").VendorSocialMedia;

}