import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { InstagramService } from '../../services/social/instagram.service';
import { Vendor } from '../../models/vendor';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.page.html',
  styleUrls: ['./business-profile.page.scss'],
})
export class BusinessProfilePage implements OnInit {

  vendor: {};
  id: string;
  hasProfilePic = false;
  instaHtml: string;

  constructor(private activatedRoute: ActivatedRoute, private vendorService: VendorService, private instagramService: InstagramService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (!params.has('businessId')) {
        // redirect back to search if parameter is missing
        return;
      }
      const businessId = params.get('businessId');
      // TODO: already sanitized for db calls?

      // call service with specific id
      this.vendorService.getVendorById(businessId).then(data => {
        // TODO: define criteria and default case
        if (data && data.business) {
          this.vendor = data;
          if (data.business && data.business.profilePic) {
            this.hasProfilePic = true;
          }
          if (data.contactInfo && data.contactInfo.socialMedia && data.contactInfo.socialMedia.instagram) {
            this.instagramService.fetchInstagramFeed(data.contactInfo.socialMedia.instagram).subscribe(data => {
              this.instaHtml = data.html;
            });
          }
        }
      }).catch(error => {
        // TODO: define errorcase
        console.log(error);
      });
    });
  }
}