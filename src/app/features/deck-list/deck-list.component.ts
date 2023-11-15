import { Component, OnInit, ViewChild } from '@angular/core';
import { DeckService } from '../../core/services/deck/deck.service';
import { Router } from '@angular/router';
import { IgxDialogComponent } from 'igniteui-angular';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {
  @ViewChild('deckInfo') deckInfo!: IgxDialogComponent;
  @ViewChild('deckEdit') deckEdit!: IgxDialogComponent;
  
  public decks: any[] = [];
  public supertypes: Record<string, number> = {};
  public types: unknown[] = [];
  public selectedDeck: any;

  constructor(
    private deckService: DeckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    this.deckService.getDecks().subscribe((decks) => {
      this.decks = decks;
    });
  }

  viewDetails(deckId: string): void {
    this.router.navigate(['/decks', deckId]);
  }

  editDeck(deckId: string): void {
    this.router.navigate(['/edit-deck', deckId]);
  }

  removeDeck(deckId: string): void {
    this.deckService.removeDeck(deckId);
    this.loadDecks(); // Recarrega a lista após a remoção
  }

  newDeck(): void {
    this.router.navigate(['create-deck']);
  }

  superTypesDeck(deck: any): Record<string, number> {
    return deck.cards.reduce((acc: Record<string, number>, card: any) => {
      let supertype = card.supertype.replace(/é/g, 'e'); // Substitui 'é' por 'e'
      acc[supertype] = (acc[supertype] || 0) + 1;
      return acc;
    }, {});
  }

  getUniqueTypes(deck: any): unknown[] {
    return [...new Set(deck.cards.flatMap((card: any) => card.types))];
  }

  openDeckEdit(deck: any): void {
    this.selectedDeck = deck;
    this.deckEdit.open();
  }

  openDeckDetail(deck: any): void {
    this.selectedDeck = deck;
    this.supertypes = this.superTypesDeck(deck);
    this.types = this.getUniqueTypes(deck);
    this.deckInfo.open();
  }
}