import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './components/menu/menu.component';
import { 
	IgxButtonModule,
	IgxIconModule,
	IgxNavigationDrawerModule,
	IgxRippleModule,
	IgxToggleModule,
  IgxCardModule,
  IgxDialogModule,
  IgxDialogComponent,
  IgxTooltipModule
 } from "igniteui-angular";
import { DeckComponent } from './components/deck/deck.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    LoadingComponent,
    MenuComponent,
    DeckComponent,
  ],
  imports: [
    CommonModule,
    IgxButtonModule,
    IgxIconModule,
    IgxNavigationDrawerModule,
    IgxRippleModule,
    IgxToggleModule,
    IgxCardModule,
    IgxDialogModule,
    IgxDialogComponent,
    IgxTooltipModule
  ],
  exports: [
    HeaderComponent,
    CardComponent,
    LoadingComponent,
    MenuComponent,
    DeckComponent
  ],
})
export class SharedModule {}