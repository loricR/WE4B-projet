import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameArray: Game[] = [];

  constructor() { }

  getGames(): Game[] {
    this.gameArray = [];
    this.gameArray.push(new Game('CSGO', '../assets/images/csgo.png', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur']));
    this.gameArray.push(new Game('CSS', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur', 'Aventure']));
    this.gameArray.push(new Game('CS2', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur']));

    return this.gameArray;
  }

  getPrdByIndex(idx : number): Game {
    return this.gameArray[idx];
  }
}
