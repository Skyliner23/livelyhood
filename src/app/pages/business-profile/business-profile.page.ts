import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { Vendor, VendorBusiness, VendorProduct, VendorContactInfo } from '../../models/vendor';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.page.html',
  styleUrls: ['./business-profile.page.scss'],
})
export class BusinessProfilePage implements OnInit {

  vendor = {};
  id: string;

  constructor(private activatedRoute: ActivatedRoute, private vendorService: VendorService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (!params.has('businessId')) {
        // redirect back to search
        return;
      }
      const businessId = params.get('businessId');
      // TODO: already sanitized for db calls?

      // TODO remove...
      this.vendor = this.createFakeVendor(businessId)

      // call service with specific id
      // this.vendorService.getVendorById(businessId).then(data => (this.vendor = data));
    });
  }

  createFakeVendor(businessId: string): Vendor {
    let v = new DummyVendor;
    v.business = new DummyVendorBusiness;
    v.business.businessName = 'Company ' + businessId;
    v.business.businessDescription = 'Dieses Geschäft macht dies und das und jenes...'
    v.business.profilePic = 'assets/icon/favicon.png';
    v.business.branch = ['dies', 'das', 'jenes', 'und noch mehr'];
    v.contactInfo = new DummyVendorContactInfo;
    v.contactInfo.email = 'asd@asd.de';
    v.contactInfo.website = 'lievelyhood.de';
    v.contactInfo.street = 'Strasse des seeligen Friedens';
    v.contactInfo.houseNumber = '123a/b';
    v.contactInfo.zipCode = '12345';
    return v;
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
  businessName: string; businessDescription: string;
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
  street: string; houseNumber: string;
  zipCode: string;
  telefone: string;
  whatsApp: string;
  email: string;
  website: string;
  socialMedia?: import("../../models/vendor").VendorSocialMedia;

}