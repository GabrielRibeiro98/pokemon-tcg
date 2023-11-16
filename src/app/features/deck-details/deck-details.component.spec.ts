import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckDetailsComponent } from './deck-details.component';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { of } from 'rxjs';

// Mock para DeckService
class DeckServiceMock {
  currentDeck = of({ cards: [] });
}

describe('DeckDetailsComponent', () => {
  let component: DeckDetailsComponent;
  let fixture: ComponentFixture<DeckDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckDetailsComponent],
      providers: [
        { provide: IgxPaginatorComponent, useValue: { page: 0, perPage: 6 } },
        { provide: DeckService, useClass: DeckServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set deck properties on ngOnInit', () => {
    const deckService = TestBed.inject(DeckService);
    spyOn(deckService.currentDeck, 'subscribe').and.callThrough();

    component.ngOnInit();

    expect(deckService.currentDeck.subscribe).toHaveBeenCalled();
    expect(component.deck).toBeTruthy();
  });

  it('should return cards data based on the paginator', () => {
    component.deck = { cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
    component.paginator = { page: 1, perPage: 5 } as any;

    const result = component.data;

    expect(result).toEqual([6, 7, 8, 9, 10]);
  });
});