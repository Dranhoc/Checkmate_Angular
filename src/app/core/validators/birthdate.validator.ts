import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import dayjs from 'dayjs';

interface BirthDateError {
  tooYoung?: boolean;
  tooOld?: boolean;
}

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const value = control.value;
    const result: BirthDateError = {};

    const date = dayjs(control.value);
    const now = dayjs();

    if (date.isAfter(now.subtract(4, 'year'))) {
      result.tooYoung = true;
    }

    if (date.isBefore(now.subtract(120, 'year'))) {
      result.tooOld = true;
    }
    if (Object.keys(result).length) return result;
    return null;
  };
}
