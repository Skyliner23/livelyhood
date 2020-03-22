import { Component, OnInit } from '@angular/core';
import { Vendor, VendorBusiness, VendorContactInfo, VendorProduct, VendorSocialMedia, VendorProvidedService } from 'src/app/models/vendor';
import { VendorService } from 'src/app/services/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.page.html',
  styleUrls: ['./register-store.page.scss'],
})
export class RegisterStorePage implements OnInit {

  latestBranch = null;
  latestServices: string[] = [];
  latestProduct = null;

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  distance;
  instInput;
  vendor: Vendor;

  constructor(private vendorService: VendorService,
    private router: Router) {
  }

  ngOnInit() {
    this.vendor = this.getNewVendor();
  }

  registerNewVendor(): void {

    console.log(this.vendor);
    if (!this.isEmptyVendor()) {
      console.log('saving to database')
      this.vendorService
        .createVendor(this.vendor)
        .then(vendorId => {
          console.log('')
          this.router.navigateByUrl(`search/${vendorId}`);
        });
    }

  }

  isEmptyVendor(): boolean {
    const isEmpty = this.isEmpty(this.vendor.business)
      || Object.keys(this.vendor.contactInfo).length === 1
      || this.isEmpty(this.vendor.services)
      || this.isEmpty(this.vendor.products);
    console.log('Empty Vendor:', isEmpty)
    return isEmpty;
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  getNewVendor(): Vendor {
    return {
      business: {} as VendorBusiness,
      contactInfo: {
        socialMedia: {} as VendorSocialMedia
      } as VendorContactInfo,
      services: [],
      products: []
    };
  }

  updateDistance() {
    document.getElementById("labelDistance").innerHTML = this.distance + " km";
  }

  uploadStoreImg() {
    console.log('test');
  }

  addBranch() {
    if (!this.vendor.business.branches) {
      this.vendor.business.branches = [];
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
    this.vendor.products.push({ name: this.latestProduct } as VendorProduct);
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
    return { name: serviceName } as VendorProvidedService;
  }


  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 4194304;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1024 / 1024 + 'Mb';

        return false;
      }
      console.log(fileInput.target.files[0].type);
      const file_type = fileInput.target.files[0].type;
      if (allowed_types.findIndex(t => file_type === t) === -1) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

}
