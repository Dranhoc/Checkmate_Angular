import { ValidatorFn } from '@angular/forms';

interface PasswordError {
  lowercase?: boolean;
  uppercase?: boolean;
  number?: boolean;
  specialChar?: boolean;
  minlength?: boolean;
}

export function passwordValidator(): ValidatorFn {
  return (control) => {
    const value = control.value;

    const result: PasswordError = {};
    //minuscule ?
    const lowerCaseRegex = /.*[a-z]/;
    if (!lowerCaseRegex.test(value)) {
      result.lowercase = true;
    }

    //majuscule ?
    const upperCaseRegex = /.*[A-Z]/;
    if (!upperCaseRegex.test(value)) {
      result.uppercase = true;
    }
    //1 chiffre ?
    const numberRegex = /.*[0-9]/;
    if (!numberRegex.test(value)) {
      result.number = true;
    }
    //1 caractère spécial ?
    const specialCharRegex = /.*[\W_]/;
    if (!specialCharRegex.test(value)) {
      result.specialChar = true;
    }
    //min length 8 ?
    if (value.length < 8) {
      result.minlength = true;
    }

    if (Object.keys(result).length) return result;
    return null;
  };
}
