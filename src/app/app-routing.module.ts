
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './features/deck-list/deck-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/decks', pathMatch: 'full' },

  {
    path: 'create-deck',
    loadChildren: () => import('./features/deck-form/deck-form.module').then((m) => m.DeckFormModule),
  },

  { path: 'decks', component: DeckListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}