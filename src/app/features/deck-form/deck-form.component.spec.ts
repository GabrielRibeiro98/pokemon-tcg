import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckFormComponent } from './deck-form.component';
import { DeckService } from '../../core/services/deck/deck.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../core/services/api/api.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { DeckFormService } from '../../core/services/deck-form/deck-form.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('DeckFormComponent', () => {
  let component: DeckFormComponent;
  let fixture: ComponentFixture<DeckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckFormComponent],
      imports: [RouterTestingModule],
      providers: [
        DeckService,
        ApiService,
        LoadingService,
        DeckFormService,
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadingCards on ngOnInit', () => {
    const loadingService = TestBed.inject(LoadingService);
    spyOn(loadingService, 'showLoading');
    spyOn(component, 'loadingCards');

    component.ngOnInit();

    expect(loadingService.showLoading).toHaveBeenCalled();
    expect(component.loadingCards).toHaveBeenCalled();
  });

  it('should handle addCard', () => {
    const pokemonCard = { name: 'Pikachu' };
    spyOn(component.selectedCards, 'push').and.callThrough();
    spyOn(component, 'generateUniqueId').and.returnValue('uniqueId');

    const result = component.addCard(pokemonCard);

    expect(component.selectedCards.push).toHaveBeenCalled();
    expect(component.generateUniqueId).toHaveBeenCalled();
    expect(result).toContain('Card adicionado ao baralho');
  });
});