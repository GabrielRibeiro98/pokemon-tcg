import { TestBed } from '@angular/core/testing';
import { DeckFormService } from './deck-form.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

describe('DeckFormService', () => {
  let service: DeckFormService;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckFormService);
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a deck form with the correct structure', () => {
    const form = service.createDeckForm();

    expect(form).toBeDefined();
    expect(form instanceof FormGroup).toBe(true);
    expect(form.get('id')).toBeDefined();
    expect(form.get('name')).toBeDefined();
    expect(form.get('cards')).toBeDefined();
    expect(form.get('cards') instanceof FormArray).toBe(true);
  });

  it('should return the cards FormArray from the deck form', () => {
    const form = fb.group({
      id: ['deck-id'],
      name: ['deck-name'],
      cards: fb.array([]),
    });

    const result = service.getSelectedCardsArray(form);

    expect(result).toBeDefined();
    expect(result instanceof FormArray).toBe(true);
    expect(result === form.get('cards')).toBe(true);
  });
});