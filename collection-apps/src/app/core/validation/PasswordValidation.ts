import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let passwordConfirm = AC.get('passwordConfirm').value;

    if(passwordConfirm !== '' && password !== passwordConfirm) {
      AC.get('passwordConfirm').setErrors( { MatchPassword: true } );
    } else {
      return null;
    }
  }

}
