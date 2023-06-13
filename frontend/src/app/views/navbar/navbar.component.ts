import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  navItem: Map<string, boolean>;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { 
    this.navItem = new Map<string, boolean>();
    this.navItem.set('home', false);
    this.navItem.set('store', false);
    this.navItem.set('actu', false);
    this.navItem.set('research', false);
    this.navItem.set('registrer', false);
    router.events.subscribe((event: Event) => {
      var currentUrl: string;
      if(event instanceof NavigationEnd) {
        currentUrl = event.url.split('/')[1]; //Get the url between / and / '/game/1' returns 'game'
        switch(currentUrl) {
          case '':
            this.setActive('home');
            break;
          case 'store':
          case 'game':
          case 'developer':
            this.setActive('store');
            break;
          case 'actu':
            this.setActive('actu');
            break;
          case 'research':
            this.setActive('research');
            break;
          case 'register':
            this.setActive('register');
            break;
          default:
            this.setActive('home');
            break;
        }

      }
    })
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  setActive(newActive: string): void {
    [...this.navItem.keys()].forEach((key) => {
      this.navItem.set(key, false);
    })
    this.navItem.set(newActive, true);
  }
}

