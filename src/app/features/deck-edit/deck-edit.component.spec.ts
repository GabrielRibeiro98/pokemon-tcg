import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckEditComponent } from './deck-edit.component';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

// Mock para ApiService
class ApiServiceMock {
  getCards(page: number, pageSize: number) {
    return of({ data: [], totalCount: 0 });
  }

  getCardByName(name: string, page: number, pageSize: number) {
    return of({ data: [], totalCount: 0 });
  }
}

describe('DeckEditComponent', () => {
  let component: DeckEditComponent;
  let fixture: ComponentFixture<DeckEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: IgxPaginatorComponent, useValue: { page: 0, perPage: 6 } },
      ],
    })
    .overrideComponent(DeckEditComponent, {
      set: {
        providers: [{ provide: ApiService, useClass: ApiServiceMock }],
      },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set deckForm properties on ngOnChanges', () => {
    const changes = { deck: { currentValue: { id: '1', name: 'Deck 1' } } } as any;
    component.ngOnChanges(changes);
    const deckForm = component.deckForm;
    expect(deckForm.get('id')?.value).toBe('1');
    expect(deckForm.get('name')?.value).toBe('Deck 1');
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
    spyOn(component.deckService, 'editDeck').and.stub();

    const result = component.addCard(pokemonCard);

    expect(component.selectedCards.push).toHaveBeenCalled();
    expect(component.deckService.editDeck).toHaveBeenCalled();
    expect(result).toContain('Card adicionado ao baralho');
  });
});