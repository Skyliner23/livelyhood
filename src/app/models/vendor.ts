export interface Vendor {
  id?: string;
  business: VendorBusiness;
  contactInfo: VendorContactInfo;
  products: VendorProduct[];
  services: VendorService[];
}

export interface VendorBusiness {
  businessName: string;
  businessDescription: string;
  businessOwner: string;
  openingHours: string;
  profilePic: string;
  businessRange: string[]; // add a range of zipCodes
  branches: string[];
}

export interface VendorContactInfo {
  street: string;
  houseNumber: string;
  zipCode: string;
  telefone: string;
  whatsApp: string;
  email: string;
  website: string;
  socialMedia?: VendorSocialMedia;
}

export interface VendorSocialMedia {
  instagram: string;
  facebook: string;
  twitter: string;
  ebay: string;
  other: [];
}

export interface VendorProduct {
  name: string;
}

export interface VendorService {
  name: string;
}
