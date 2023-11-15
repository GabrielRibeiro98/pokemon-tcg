import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public selected = 'Meus baralhos';
  public navItems = [
    { name: 'list', text: 'Meus baralhos', route: '/decks' },
    { name: 'add', text: 'Adicionar baralho', route: '/create-deck' },
  ];

  constructor(private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSelected();
      }
    });
  }

  updateSelected() {
    const route = this.router.url;
    const item = this.navItems.find(item => item.route === route);
    if (item) {
      this.selected = item.text;
    }
  }

  public navigate(item: any) {
    this.selected = item.text;
    this.router.navigate([item.route]);
  }
}
