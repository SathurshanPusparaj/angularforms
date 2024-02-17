import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validators';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

/*   email = new FormControl('', 
  {
    validators: [Validators.required, Validators.email],
    updateOn:'blur'
  });

  password = new FormControl('', 
  {
    validators: [
      Validators.required, 
      Validators.minLength(8),
      createPasswordStrengthValidator()
    ]
  });

  form = new FormGroup({
    email: this.email,
    password: this.password,
  }); */

  form = this.fb.group({
    email: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    password: ['', [
      Validators.required, 
      Validators.minLength(8),
      createPasswordStrengthValidator()]]
  })


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  login() {
    const formValue = this.form.value;

    console.log(formValue.email);
    console.log(formValue.password);
  }
}
