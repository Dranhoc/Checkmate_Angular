import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-forms-error-display',
  imports: [],
  templateUrl: './forms-error-display.html',
  styleUrl: './forms-error-display.css',
})
export class FormsErrorDisplay {
  control = input.required<FormControl<unknown | null>>();
  name = input.required<string>();
}
