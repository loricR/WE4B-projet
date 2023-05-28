import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGames(): Game[] {
    return [
      new Game('CSGO', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description courte.', 12, 'nom du dev'),
      new Game('CSGO', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description courte.', 12, 'nom du dev'),
      new Game('CSGO', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description courte.', 12, 'nom du dev')
    ]
  }
}
