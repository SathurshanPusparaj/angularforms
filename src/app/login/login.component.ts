import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val = {
    email: "hello@gmail.com",
    password: "abcde"
  }

  constructor() {


  }

  ngOnInit() {

  }

  login (loginForm: NgForm, submit: any) {
    console.log(loginForm);
  }

  onEmailChange(arg0: any) {
   //console.log(arg0);
  }

}
