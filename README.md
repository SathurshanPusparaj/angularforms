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

-----------------------------------------------------------------------------------------------------------------------------------------------------

impure pipe

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