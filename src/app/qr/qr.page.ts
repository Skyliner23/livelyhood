import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  userId: any;

  constructor(
    public auth: UserService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private alertCtrl: AlertController,
    private router: Router,
    ) { }

  itemId = this.db.createId();
  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  async onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.presentAlert()
    //console.log(this.qrResultString)
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
    message: this.qrResultString,
    header: 'Success',
    buttons: ['Ok'],
   })
   this.insertQRData();
   await alert.present().then(()=> {
    this.router.navigate['/store']
   });
   this.qrResultString = null; 
}


  insertQRData(){
  this.afAuth.authState.subscribe(user => {
    if(user){
      this.userId = user.uid;
    }
    //console.log(user.uid);

    this.db.collection('Users').doc(this.userId).collection('Items').doc(this.itemId).set({
      data: this.qrResultString
    })
    //console.log(this.qrResultString)
  });
}

  ngOnInit() {
  }
}