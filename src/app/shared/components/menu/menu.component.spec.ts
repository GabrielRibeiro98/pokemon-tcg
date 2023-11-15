import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        { provide: Router, useValue: { url: '/decks', events: of({}) } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected on navigation end', () => {
    (router as any).url = '/create-deck';
    component.updateSelected();
    expect(component.selected).toBe('Adicionar baralho');
  });

  it('should navigate to route', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.navigate({ text: 'Adicionar baralho', route: '/create-deck' });
    expect(navigateSpy).toHaveBeenCalledWith(['/create-deck']);
    expect(component.selected).toBe('Adicionar baralho');
  });
});