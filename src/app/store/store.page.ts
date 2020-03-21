import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';

export interface Policy {
  test: any;
}



@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  itemCollection: any;
  userId: any;
  users: any;
  policies: Policy[];

  constructor(
    public auth: UserService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    //Get UserId 
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
      }

      //Get QR-Code Data from "Items" Collection
      this.db.collection('Users').doc(this.userId).collection('Items').snapshotChanges().subscribe(data => {
        this.policies = data.map(e => {
          console.log(e)
          return {
            test: e.payload.doc.data()
          };
        })
      })
    })
   }
}
