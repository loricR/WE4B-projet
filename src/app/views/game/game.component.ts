import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game!: Game;
  @Input() game_idx! : number;

  constructor(private router: Router) {};

  ngOnInit(): void {};

  readMore() {
    this.router.navigate(['/', 'game', this.game_idx+1])
  }
}