import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: firebase.User;
  
  constructor(public auth: UserService, 
              private router: Router,
              private db: AngularFirestore) {}

  ngOnInit(){
    this.auth.needLogin();
    this.auth.getUserState().subscribe(user => {
      this.user = user;
    })
  }

  login(){
    this.router.navigate(['/login'])
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}