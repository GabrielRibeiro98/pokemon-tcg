import { TestBed } from '@angular/core/testing';
import { DeckService } from './deck.service';
import { Deck } from '../../models/deck.model';

describe('DeckService', () => {
  let service: DeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a deck and notify observers', () => {
    const deck: Deck = { id: '1', name: 'Deck 1', cards: [] };

    service.createDeck(deck);

    service.getDecks().subscribe((decks) => {
      expect(decks.length).toBe(1);
      expect(decks[0]).toEqual(deck);
    });
  });

  it('should remove a deck and notify observers', () => {
    const deck: Deck = { id: '1', name: 'Deck 1', cards: [] };

    service.createDeck(deck);
    service.removeDeck(deck.id);

    service.getDecks().subscribe((decks) => {
      expect(decks.length).toBe(0);
    });
  });

  it('should edit a deck and notify observers', () => {
    const originalDeck: Deck = { id: '1', name: 'Deck 1', cards: [] };
    const updatedDeck: Deck = { id: '1', name: 'Updated Deck', cards: [] };

    service.createDeck(originalDeck);
    service.editDeck(originalDeck.id, updatedDeck);

    service.getDecks().subscribe((decks) => {
      expect(decks.length).toBe(1);
      expect(decks[0]).toEqual(updatedDeck);
    });
  });
});