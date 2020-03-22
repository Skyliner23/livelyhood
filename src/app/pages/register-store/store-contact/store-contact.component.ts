import { Component, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from 'src/app/models/vendor';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-store-contact',
  templateUrl: './store-contact.component.html',
  styleUrls: ['./store-contact.component.scss'],
})


export class StoreContactComponent implements OnInit {
  distance;
  instaInput;


  @Input() vendor: Vendor;
  @Output() vendorCange =  new EventEmitter()

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  updateDistance()
  {
    document.getElementById("labelDistance").innerHTML = this.distance + " km";
  }
  instaChanged()
  {
    this.http.get('https://instagram.com/' + this.instaInput).subscribe((response) => {
      console.log(response);
  });
  }
  uploadStoreImg()
  {
    console.log('test');  
  }
  mailChanged()
  {
    document.getElementById("mail").style.color = "0xFF0000";
  }
}

