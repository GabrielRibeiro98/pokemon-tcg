import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deck } from '../../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private deckSource = new BehaviorSubject<any>(null);
  currentDeck = this.deckSource.asObservable();

  private decks: Deck[] = [];
  private decksSubject = new BehaviorSubject<Deck[]>(this.decks);

  getDecks(): Observable<Deck[]> {
    return this.decksSubject.asObservable();
  }

  createDeck(deck: Deck): void {
    this.decks.push(deck);
    this.decksSubject.next([...this.decks]);
  }

  removeDeck(deckId: string): void {
    this.decks = this.decks.filter((deck) => deck.id !== deckId);
    this.decksSubject.next([...this.decks]);
  }

  editDeck(deckId: string, updatedDeck: Deck): void {
    const index = this.decks.findIndex((deck) => deck.id === deckId);
    if (index !== -1) {
      this.decks[index] = updatedDeck;
      this.decksSubject.next([...this.decks]);
    }
  }
}