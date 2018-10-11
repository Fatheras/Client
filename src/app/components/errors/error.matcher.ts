import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, ValidatorFn, FormGroup } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

    public equalValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
        return (group: FormGroup): { [key: string]: any } => {
            const target = group.controls[targetKey];
            const toMatch = group.controls[toMatchKey];

            const isMatch = target.value === toMatch.value;

            if (!isMatch && target.valid && toMatch.valid) {
                toMatch.setErrors({ equalValue: targetKey });
                const message = targetKey + ' != ' + toMatchKey;
                return { 'equalValue': message };
            }
            if (isMatch && toMatch.hasError('equalValue')) {
                toMatch.setErrors(null);
            }

            return null;
        };
      }
}
