css style used in form

ng touched
ng pristine - changed the initial value - ng dirty - if initial value modified
ng valid

default
 [ngModelOptions]="{updateOn: 'change'}"

 can be changed to
 [ngModelOptions]="{updateOn: 'blur'}"
 [ngModelOptions]="{updateOn: 'submit'}" // submitted the then only the ngModelChange method invoked

[ngModelOptions]="{name: 'email'}"
[ngModelOptions]="{standalone: true}" //Parent ngForm not get notified if this is enabled

One way directional data binding
[ngModel]="val.email"

Two way directional data binding
[(ngModel)]="val.email"

```
//Form validation directive
@Directive({
    selector: "[passwordStrength]",
    providers: [{provide: NG_VALIDATORS,
         useExisting: PasswordStrengthDirective,
         multi: true
        }]
})
export class PasswordStrengthDirective implements Validator{
    validate(control: AbstractControl<any, any>): ValidationErrors {
       return createPasswordStrengthValidator()(control);
    }
}

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true} : null;
    }
}
```

-----------------------------------------------------------------------------------------------------------------------------------------------------

impure pipe

```
<ng-container *ngIf="password.errors | onlyOneError:['minlength','passwordStrength'] as error">

    <div class="field-message"  *ngIf="error.minlength">Your password must have minimum {{ error.minlength.requiredLength }} chars, but it only has {{ error.minlength.actualLength }
    </div>

    <div class="field-message" *ngIf="error.passwordStrength">Your password must have lower case, upper case and numeric characters.</div>
</ng-container>

@Pipe({
    name: 'onlyOneError'
})
export class OnlyOneErrorPipe implements PipeTransform {
    transform(allErrors: any, errorsPriority: any[]) {
        if (!allErrors) {
            return null;
        }

        const onlyOneError: any = {}

        for (let error of errorsPriority) {
            if (allErrors[error]) {
                console.log(allErrors);
                onlyOneError[error] = allErrors[error];
                break;
            }
        }

        return onlyOneError;
    }

}
```

### Reactive forms
```
form group builder
initialvalue, sync validators, async validators

 form = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['', [
      Validators.required, 
      Validators.minLength(8),
      createPasswordStrengthValidator()]]
  })

[formGroup]="form"
formControlName="password"

  <form class="login-form data-form" [formGroup]="form">
      <mat-form-field>
        <input matInput type="email" name="email"
               placeholder="Email" formControlName="email">
      </mat-form-field>

      <mat-form-field>
        <input matInput type="password" placeholder="Password" formControlName="password">
      </mat-form-field>

      <button mat-raised-button color="primary">
        Login
      </button>
    </form>
 ``` 

 FormNonNullable
 ```
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

reset form
    this.form.reset();
    BY DEFAULT -> It change the email to null,  this.fb.nonNullable.control assigns the empty string

OR ELSE

constructor(private fb: NonNullableFormBuilder) {

}

form = this.fb.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['', [
      Validators.required, 
      Validators.minLength(8),
      createPasswordStrengthValidator()]]
  })


 ```