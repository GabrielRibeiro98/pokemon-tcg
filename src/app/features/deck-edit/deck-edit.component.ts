import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IgxPaginatorComponent, IgxStepperOrientation, IgxStepperTitlePosition } from 'igniteui-angular';

import { ApiService } from 'src/app/core/services/api/api.service';
import { DeckFormService } from '../../core/services/deck-form/deck-form.service';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css'],
})
export class DeckEditComponent implements OnInit, OnChanges {
  @ViewChild('paginator', { static: false }) public paginator!: IgxPaginatorComponent;
  @Input() deck: any;

  public orientation: IgxStepperOrientation = 'horizontal';
  public titlePosition: IgxStepperTitlePosition = 'bottom';
  public itemsPerPage = [6];

  deckForm: FormGroup;
  cards: any = [];
  canCardDelete: boolean = true;
  pageSize: number = 10;
  currentPage: number = 1;
  totalRecords: number = 0;
  searchPokemonName: string = '';
  page = 1;

  constructor(
    private apiService: ApiService,
    private deckFormService: DeckFormService,
    private deckService: DeckService,
    private loading: LoadingService,
  ) {
    this.deckForm = this.deckFormService.createDeckForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deck'].currentValue) {
      this.deckForm.get('id')?.setValue(changes['deck'].currentValue.id);
      this.deckForm.get('name')?.setValue(changes['deck'].currentValue.name);
    }
  }

  ngOnInit() {
    this.deckService.currentDeck.subscribe((deck) => {
      this.deck = deck;
    });
  }

  loadingCards(page: number = 1, pageSize: number = 6) {
    this.loading.showLoading();
    this.apiService.getCards(page, pageSize).subscribe((decks) => {
      this.cards = decks.data;
      this.totalRecords = decks.totalCount;
      this.loading.hideLoading();
    });
  }

  pageChange(page: number) {
    this.cards = [];
    this.page = page;
    this.searchPokemonName
      ? this.searchPokemon(this.searchPokemonName, page + 1)
      : this.loadingCards(page + 1);
  }

  perPageChange(perPage: number) {
    this.cards = [];
    this.loadingCards(this.page, perPage);
  }

  searchPokemon(name: string, page: number) {
    this.searchPokemonName = name;
    this.cards = [];
    this.loading.showLoading();
    this.apiService
      .getCardByName(`name:${name}*`, page, 6)
      .subscribe((decks) => {
        this.cards = decks.data;
        this.totalRecords = decks.totalCount;
        this.loading.hideLoading();
      });
  }

  saveNameDeck(): string {
    let name = this.deckForm.get('name')?.value;
    if (!name) {
      return 'nome incorreto';
    }
  
    this.deck.name = name;
    this.deckService.editDeck(this.deck.id, this.deck);
    return 'Nome do baralho alterado com sucesso';
  }

  addCard(card: any): string {
    if (this.deck.cards.length === 60) {
      return 'O baralho já atingiu a quantidade máxima de cartas';
    }
  
    const existingCards = this.deck.cards.filter(
      (control: any) => control.name === card.name
    );
  
    if (existingCards.length >= 4) {
      return `Limite de 4 cartas com o nome ${card.name} atingido.`;
    }
  
    this.deck.cards.push(card);
    this.deckService.editDeck(this.deck.id, this.deck);
    return `Card adicionado ao baralho - ${this.deck.cards.length} de 60`;
  }

  deleteCard(i: number): string {
    if (this.deck.cards.length <= 24) {
      return 'número mínimo de cartas atingido.';
    }
  
    this.deck.cards.splice(i, 1);
    this.deckService.editDeck(this.deck.id, this.deck);
    return 'Card excluído com sucesso';
  }

  public get data() {
    let cards = this.deck.cards;
    cards = this.paginator
      ? this.deck.cards.slice(
          this.paginator.page * this.paginator.perPage,
          (this.paginator.page * this.paginator.perPage) + this.paginator.perPage
        )
      : cards;
    return cards;
  }
}