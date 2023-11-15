export interface Deck {
  id: string;
  name: string;
  cards: any[];
}

export interface Supertype{
  Energy?: number ;
  Pokemon?: number;
  Trainer?: number;
}