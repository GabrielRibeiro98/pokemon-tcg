import { NgModule } from '@angular/core';
import { ApiService } from './services/api/api.service';
import { DeckService } from './services/deck/deck.service';
import { IgxDialogComponent } from 'igniteui-angular';
import { DeckFormComponent } from '../features/deck-form/deck-form.component';
import { DeckFormService } from './services/deck-form/deck-form.service';

@NgModule({
  providers: [ApiService, DeckService, IgxDialogComponent, DeckFormService],
})
export class CoreModule {}