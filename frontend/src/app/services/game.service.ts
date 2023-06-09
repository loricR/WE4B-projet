import { Injectable } from '@angular/core';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameArray: Game[] = [];

  constructor() {
    this.gameArray = [];
    this.gameArray.push(new Game(1,'CSGO', 'La description courte.', 1, 'La description longue.', 12, 'edYCtaNueQY', ['../assets/images/csgo.png'], ['FPS', 'Multijoueur'], ));
    //this.gameArray.push(new Game(2,'CSS', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur', 'Aventure'], 'XMmQ2DTGHOk'));
    //this.gameArray.push(new Game(3,'CS2', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur'], '2iivKSgqlgs'));
  }

  getGames(): Game[] {
    return this.gameArray;
  }

  getPrdByIndex(idx : number): Game {
    return this.gameArray[idx];
  }
}
