import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const nameRe = /^[\u0E00-\u0E7F_A-z.]*((-|\s)*[\u0E00-\u0E7F_A-z.])*$/g;
  if (control.value && nameRe.test(control.value)) {
    return null;
  } else {
    return { name: true };
  }
}
