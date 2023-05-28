import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { GamefullService } from 'src/app/services/gamefull.service';

@Component({
  selector: 'app-gamefull',
  templateUrl: './gamefull.component.html',
  styleUrls: ['./gamefull.component.css']
})
export class GamefullComponent {
  public prd_idx : number
  public game : Game

  constructor(private activatedroute : ActivatedRoute, private service : GameService, private gameFullService: GamefullService) { 

      this.prd_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
      this.game = service.getPrdByIndex(this.prd_idx-1)
    }
    
  ngOnInit(): void {
   /* const toggleElement: HTMLElement = document.querySelector('[data-bs-toggle="modal"]');
    const targetModalId: string = toggleElement.getAttribute('data-bs-target');
    const targetModal: HTMLElement = document.querySelector(targetModalId);

    toggleElement.addEventListener('click', () => {
      const bootstrapModal = new Modal(targetModal);
      bootstrapModal.toggle();
    });
  }*/
    //this.gameFullService.showModal(document.getElementById('gameModal'), document.body);
  }

  ngAfterViewInit(): void {
    this.gameFullService.eventClose(document.getElementById('gameModal'));
  }
}
