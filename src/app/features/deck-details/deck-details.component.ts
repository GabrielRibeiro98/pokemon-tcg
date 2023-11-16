import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IgxPaginatorComponent } from 'igniteui-angular';

import { Supertype } from 'src/app/core/models/deck.model';
import { DeckService } from 'src/app/core/services/deck/deck.service';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {
  @ViewChild('paginator', { static: false }) public paginator!: IgxPaginatorComponent;
  @Input() deck: any;
  @Input() supertypes!: Supertype;
  @Input() types: unknown[] = [];
  @Input() Trainer: number = 0;
  public itemsPerPage = [6];

  constructor(private deckService: DeckService) { }

  ngOnInit() {
    this.deckService.currentDeck.subscribe(deck => {
      this.deck = deck;
    });
  }

  public get data() {
    let cards = this.deck.cards;
    if (this.paginator) {
      const start = this.paginator.page * this.paginator.perPage;
      const end = start + this.paginator.perPage;
      cards = this.deck.cards.slice(start, end);
    }
    return cards;
  }
}