import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DeckFormComponent } from './deck-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IgxButtonModule, IgxInputGroupModule, IgxPaginatorModule, IgxDialogModule, IgxDialogComponent, IgxSnackbarModule, IgxIconModule, IgxSnackbarComponent } from "igniteui-angular";
import { DeckFormService } from '../../core/services/deck-form/deck-form.service';

const routes: Routes = [
  { path: '', component: DeckFormComponent },
];

@NgModule({
  declarations: [
    DeckFormComponent,
    // ... outros componentes relacionados
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
    RouterModule.forChild(routes),
    // ... outros módulos necessários
  ],
})
export class DeckFormModule {}