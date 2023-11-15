import { Component, ViewChild } from '@angular/core';
import { DeckService } from '../../core/services/deck/deck.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api/api.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { DeckFormService } from '../../core/services/deck-form/deck-form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const MAX_CARDS_IN_DECK = 60;
const MAX_IDENTICAL_CARDS = 4;

interface Deck {
  id: string;
  name: string;
  cards: any[];
}

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.css'],
})
export class DeckFormComponent {
  @ViewChild('paginator', { static: true }) public paginator!: IgxPaginatorComponent;
  isEmpty = false;
  cards: any[] = [];
  deck: Deck = { id: '', name: '', cards: [] };
  newCardName = '';
  page = 1;
  searchPokemonName: string = '';

  deckForm: FormGroup;

  public itemsPerPage = [10, 20, 30, 50, 100, 150, 250];
  pageSize: number = 10;
  currentPage: number = 1; 
  totalRecords: number = 0;

  constructor(
    private deckService: DeckService,
    private router: Router,
    private apiService: ApiService,
    private loading: LoadingService,
    private deckFormService: DeckFormService,
    private fb: FormBuilder,
  ) {
    this.deckForm = this.deckFormService.createDeckForm();
  }

  loadingCards(page: number = 1, pageSize: number = 10){
    this.loading.showLoading();
    this.apiService.getCards(page, pageSize).pipe(
      catchError(error => {
        console.error(error);
        this.loading.hideLoading();
        return throwError(() => new Error('Your error message'))
      })
    ).subscribe(decks => {
      this.cards = decks.data;
      this.totalRecords = decks.totalCount;
      this.loading.hideLoading();
    })
  }

  pageChange(page: number){
    this.cards = [];
    this.page = page;
    this.searchPokemonName ? this.searchPokemon(this.searchPokemonName, page + 1) : this.loadingCards(page + 1);
  }

  perPageChange(perPage: number){
    this.cards = [];
    this.loadingCards(this.page, perPage);
  }

  searchPokemon(name: string, page: number){
    this.searchPokemonName = name;
    this.cards = [];
    this.loading.showLoading();
    this.apiService.getCardByName(`name:${name}*`, page, 10).pipe(
      catchError(error => {
        console.error(error);
        this.loading.hideLoading();
        return throwError(() => new Error('Your error message'))
      })
    ).subscribe(decks => {
      this.cards = decks.data;
      this.totalRecords = decks.totalCount;
      this.loading.hideLoading();
    })
  }

  get selectedCards() {
    return this.deckFormService.getSelectedCardsArray(this.deckForm);
  }

  addCard(pokemonCard: any): string {
    if(this.selectedCards.length === MAX_CARDS_IN_DECK)
      return `Número máximo de cartas em um baralho foi atingido - ${MAX_CARDS_IN_DECK} de ${MAX_CARDS_IN_DECK}`
    const newCardControl = this.fb.control(pokemonCard);
    const existingCardIndex = this.selectedCards.controls.findIndex(
      (control: any) =>  control.value.name === pokemonCard.name
    );

    if (existingCardIndex !== -1) {
      const existingCardCount = this.selectedCards.controls.filter(
        (control: any) => control.value.name === pokemonCard.name
      ).length;
      if (existingCardCount < MAX_IDENTICAL_CARDS) {
        this.selectedCards.push(newCardControl);
        return `Card adicionado ao baralho - ${this.selectedCards.length} de ${MAX_CARDS_IN_DECK}`
      } else {
        return `Limite de ${MAX_IDENTICAL_CARDS} cartas com o nome ${pokemonCard.name} atingido.`
      }
    } else {
      this.selectedCards.push(newCardControl);
      return `Card adicionado ao baralho - ${this.selectedCards.length} de ${MAX_CARDS_IN_DECK}`
    }
  }

  saveDeck(): string {
    this.deckForm.get('id')?.setValue(this.generateUniqueId());
    if (this.deckForm.valid) {
      let deck = this.deckForm.getRawValue();
      this.deckService.createDeck(deck);
      this.router.navigate(['/decks']);
      return 'Baralho criado com sucesso'
    } else {
      return 'Por favor, preencha todos os campos e garanta que o baralho tenha entre 24 e 60 cartas.';
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}