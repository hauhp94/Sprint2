import {AbstractControl} from '@angular/forms';
// Tung check validate date from and date to of field search
export function DateBirthSearchValidator(control: AbstractControl): { [key: string]: boolean } | null {

  const fromDate = control.get('dateOfBirthFrom');
  const toDate = control.get('dateOfBirthTo');
  if (fromDate.value > toDate.value && fromDate.value != ''
    && toDate.value != '') {
    return {
      dateToSearch: true,
    };
  }
  if (toDate.value != '' && fromDate.value != '' && fromDate.value > toDate.value) {
    return {
      dateToSearch: true
    };
  }
  return {};
}
