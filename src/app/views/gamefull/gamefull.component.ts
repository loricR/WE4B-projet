import { Component, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-gamefull',
  templateUrl: './gamefull.component.html',
  styleUrls: ['./gamefull.component.css']
})

export class GamefullComponent {
  public prd_idx : number
  public game : Game

  constructor(private activatedroute : ActivatedRoute, private service : GameService) { 

    this.prd_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
    this.game = service.getPrdByIndex(this.prd_idx-1)
  }
    
  ngOnInit(): void {
  }
}
