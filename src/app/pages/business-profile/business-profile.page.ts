import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.page.html',
  styleUrls: ['./business-profile.page.scss'],
})
export class BusinessProfilePage  implements OnInit {

  company = 'Company 123';

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
    });
  }

}
