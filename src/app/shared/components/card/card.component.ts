import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IgxDialogComponent } from 'igniteui-angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() id: string = '';
  @Input() imageUrl: string = '';
  @Input() imageLarge: string = '';
  @Input() selectedBoolean: boolean = false;
  @Input() deleteBoolean: boolean = false;
  @Output() cardSelected = new EventEmitter<boolean>();
  @Output() cardDelete = new EventEmitter<boolean>();
  @Output() cardViewed = new EventEmitter<void>();

  isSelected = false;
  isMouseOver = false;

  constructor(private dialog: IgxDialogComponent) {
  }

  onMouseEnter(): void {
    this.isMouseOver = true;
  }

  onMouseLeave(): void {
    this.isMouseOver = false;
  }

  toggleSelection(): void {
    this.cardSelected.emit();
  }

  delete(): void {
    this.cardDelete.emit();
  }

  viewCardDetails(): void {
    this.cardViewed.emit();
  }
}