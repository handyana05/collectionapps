import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let passwordConfirm = AC.get('passwordconfirm').value;

    if(passwordConfirm !== '' && password !== passwordConfirm) {
      AC.get('passwordconfirm').setErrors( { MatchPassword: true } );
    } else {
      return null;
    }
  }

}
