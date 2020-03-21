import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authError: any;

  constructor(private auth: UserService) { }

  ngOnInit() {
    this.auth.needLogin();
    this.auth.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
  }

  login(frm){
    this.auth.login(frm.value.email, frm.value.password);
  }

}