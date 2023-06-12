import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameArray: Game[] = [];
  
  constructor(private router: Router) { 
    this.gameArray = [];
    


    //Modèle incluant cpu, gpu et ram : 
    // this.gameArray.push(new Game(1, 'Counter Strike Global Offensive', '../assets/images/csgo.png', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur'], 'edYCtaNueQY',"Intel Core 2 Duo E6600", "AMD Phenom X3 8750 or better", "2 GB"));
    // this.gameArray.push(new Game(2, 'CSS', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur', 'Aventure'], 'XMmQ2DTGHOk',"Intel Core i7 ", "Nvidia Geforce GTX560", "5 GB"));
    // this.gameArray.push(new Game(3, 'CS2', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur'], '2iivKSgqlgs',"Intel Core i9 ", "Nvidia Geforce RTX4090 Ti", "34 GB"));
    
    this.gameArray.push(new Game(1,'CSGO', 'La description courte.', 1, 'La description longue.', 12, 'edYCtaNueQY', ['../assets/images/csgo.png'], ['FPS', 'Multijoueur'],"Intel Core i9 ", "Nvidia Geforce RTX4090 Ti", "34 GB" ));

  }

  getGames(): Game[] {
    return this.gameArray;
  }

  getPrdByIndex(idx : number): Game {
    return this.gameArray[idx];
  }

  devpage(id : number) : void{
    this.router.navigate(['/', 'developer', id])
  }

}
