import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  authError: any;
  
  constructor(public auth: UserService) { }

  ngOnInit(){
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }

  createUser(frm){
    this.auth.createUser(frm.value);
  }
}