import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() deckLenght: number = 0;

  @Output() cardEdit = new EventEmitter<void>();
  @Output() cardInfo = new EventEmitter<void>();
  @Output() cardDelete = new EventEmitter<void>();

  edit(): void {
    this.cardEdit.emit();
  }

  info(): void {
    this.cardInfo.emit();
  }

  delete(): void {
    this.cardDelete.emit();
  }
}
