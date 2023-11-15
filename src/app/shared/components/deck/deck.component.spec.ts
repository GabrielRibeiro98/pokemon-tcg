import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckComponent } from './deck.component';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckComponent],
    });

    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardEdit event when edit is called', () => {
    const spy = spyOn(component.cardEdit, 'emit');
    component.edit();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit cardInfo event when info is called', () => {
    const spy = spyOn(component.cardInfo, 'emit');
    component.info();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit cardDelete event when delete is called', () => {
    const spy = spyOn(component.cardDelete, 'emit');
    component.delete();
    expect(spy).toHaveBeenCalled();
  });

  // You can add more test cases as needed
});