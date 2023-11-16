import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DeckFormService {
  constructor(private fb: FormBuilder) {}

  createDeckForm() {
    return this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      cards: this.fb.array([], [Validators.minLength(24), Validators.maxLength(60)]),
    });
  }

  getSelectedCardsArray(form: FormGroup): FormArray {
    return form.get('cards') as FormArray;
  }
}