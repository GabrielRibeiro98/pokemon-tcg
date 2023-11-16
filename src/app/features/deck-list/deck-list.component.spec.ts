import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DeckListComponent } from './deck-list.component';
import { DeckService } from '../../core/services/deck/deck.service';

describe('DeckListComponent', () => {
  let component: DeckListComponent;
  let fixture: ComponentFixture<DeckListComponent>;
  let deckService: DeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckListComponent],
      imports: [RouterTestingModule],
      providers: [DeckService],
    });

    fixture = TestBed.createComponent(DeckListComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load decks on ngOnInit', () => {
    const decks = [{ id: '1', name: 'Deck 1', cards: [] }];
    spyOn(deckService, 'getDecks').and.returnValue(of(decks));

    component.ngOnInit();

    expect(component.decks).toEqual(decks);
  });

  it('should navigate to view details page', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    const deckId = '1';

    component.viewDetails(deckId);

    expect(routerSpy).toHaveBeenCalledWith(['/decks', deckId]);
  });

  it('should navigate to edit deck page', () => {
    const routerSpy = spyOn(component.router, 'navigate');
    const deckId = '1';

    component.editDeck(deckId);

    expect(routerSpy).toHaveBeenCalledWith(['/edit-deck', deckId]);
  });

  it('should remove deck and reload decks', () => {
    const deckId = '1';
    spyOn(deckService, 'removeDeck');
    const loadDecksSpy = spyOn(component, 'loadDecks');

    component.removeDeck(deckId);

    expect(deckService.removeDeck).toHaveBeenCalledWith(deckId);
    expect(loadDecksSpy).toHaveBeenCalled();
  });

  it('should navigate to create deck page', () => {
    const routerSpy = spyOn(component.router, 'navigate');

    component.newDeck();

    expect(routerSpy).toHaveBeenCalledWith(['create-deck']);
  });

  it('should open deck edit dialog', () => {
    const deck = { id: '1', name: 'Deck 1', cards: [] };
    component.selectedDeck = deck;
    const deckEditSpy = spyOn(component.deckEdit, 'open');

    component.openDeckEdit(deck);

    expect(component.selectedDeck).toEqual(deck);
    expect(deckEditSpy).toHaveBeenCalled();
  });

  it('should open deck detail dialog', () => {
    const deck = { id: '1', name: 'Deck 1', cards: [] };
    component.selectedDeck = deck;
    const superTypesSpy = spyOn(component, 'superTypesDeck').and.returnValue({});
    const getUniqueTypesSpy = spyOn(component, 'getUniqueTypes').and.returnValue([]);
    const deckInfoSpy = spyOn(component.deckInfo, 'open');

    component.openDeckDetail(deck);

    expect(component.selectedDeck).toEqual(deck);
    expect(superTypesSpy).toHaveBeenCalledWith(deck);
    expect(getUniqueTypesSpy).toHaveBeenCalledWith(deck);
    expect(deckInfoSpy).toHaveBeenCalled();
  });
});