import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { IgxGridModule } from 'igniteui-angular';
import { IgxButtonModule } from 'igniteui-angular';
import { HttpClientModule } from '@angular/common/http';
import { HammerModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { DeckFormModule } from './features/deck-form/deck-form.module';
import { DeckListModule } from './features/deck-list/deck-list.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DeckFormModule,
    DeckListModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    IgxGridModule,
    IgxButtonModule,
    HammerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
