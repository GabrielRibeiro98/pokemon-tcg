import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { IgxDialogComponent } from 'igniteui-angular';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cardSelected event when toggleSelection is called', () => {
    const spy = spyOn(component.cardSelected, 'emit');
    component.toggleSelection();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit cardDelete event when delete is called', () => {
    const spy = spyOn(component.cardDelete, 'emit');
    component.delete();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit cardViewed event when viewCardDetails is called', () => {
    const spy = spyOn(component.cardViewed, 'emit');
    component.viewCardDetails();
    expect(spy).toHaveBeenCalled();
  });

  it('should set isMouseOver to true on onMouseEnter', () => {
    component.onMouseEnter();
    expect(component.isMouseOver).toBe(true);
  });

  it('should set isMouseOver to false on onMouseLeave', () => {
    component.onMouseLeave();
    expect(component.isMouseOver).toBe(false);
  });
});