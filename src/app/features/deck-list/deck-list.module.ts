import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { 
  IgxButtonModule, 
  IgxInputGroupModule, 
  IgxPaginatorModule,
  IgxDialogModule, 
  IgxDialogComponent, 
  IgxSnackbarModule, 
  IgxIconModule, 
  IgxStepperModule } from "igniteui-angular";
import { DeckListComponent } from './deck-list.component';
import { DeckDetailsComponent } from '../deck-details/deck-details.component';
import { DeckEditComponent } from '../deck-edit/deck-edit.component';

const routes: Routes = [
  { path: '', component: DeckListComponent },
];

@NgModule({
  declarations: [
    DeckListComponent,
    DeckDetailsComponent,
    DeckEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxPaginatorModule,
    IgxDialogModule,
    IgxDialogComponent,
    IgxSnackbarModule,
    IgxIconModule,
    IgxStepperModule,
    RouterModule.forChild(routes),
    // ... outros módulos necessários
  ],
})
export class DeckListModule {}