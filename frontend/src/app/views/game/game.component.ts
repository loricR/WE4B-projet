import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game!: Game;
  @Input() game_idx! : number;
  protected rating: number = 0;

  constructor(private router: Router,private GameService:GameService) {};

  ngOnInit(): void {};


  readMore() {
    this.router.navigate(['/', 'game', this.game_idx+1]);
  }
  calldev() {
    this.GameService.devpage(this.game.dev);
  }
  setrating(rating: number):void{
    this.rating = rating;
  }

}