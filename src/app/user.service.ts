import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { User } from 'firebase';

/*
  npm install npm i @angular/fire
  npm install firebase @angular/fire --save
  npm i rxjs
*/

interface NewUser {
  email?: string;
  password?: string;
}

interface Jokes {
  data?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCollection: AngularFirestoreCollection;

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();


  newUser: any;
  userId: any;
  users: any;
  itemCollection: Jokes[];

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
    ) {  }

    itemId = this.db.createId();
    qrResult: string;

  getUserState() {
    return this.afAuth.authState;
  }

  getUserId(){
    var test = this.afAuth.authState.subscribe(user => {
      if(user)
        this.userId = user.uid;
    })
    console.log(this.userId);
  }

  needLogin(){
    this.afAuth.authState.subscribe(res => {
      if(res && res.uid){
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/login'])
      }
    })  
  }

  login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/home']);
        }
      })
  }

  createUser(user) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
          displayName: user.firstName + ' ' + user.lastName
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/home']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
