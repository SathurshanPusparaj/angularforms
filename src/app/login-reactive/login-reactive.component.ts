import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  email = new FormControl('', {validators: [Validators.required, Validators.email]});

  password = new FormControl('', {validators: [Validators.required, Validators.minLength(8)]});

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });


  constructor() {


  }

  ngOnInit() {

  }

}
