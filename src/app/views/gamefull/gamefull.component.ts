import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('youtubePlayer') youtubePlayer: ElementRef | undefined;
  videoHeight: number | undefined;
  videoWidth: number | undefined;

  constructor(private activatedroute : ActivatedRoute, private service : GameService, 
    //private changeDetectorRef: ChangeDetectorRef
    ) { 

    this.prd_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
    this.game = service.getPrdByIndex(this.prd_idx-1)
  }
    
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));  //Call onResize everytime the window is resized
  }

  onResize(): void {
    if(this.youtubePlayer != null) {  //If the component exists
      this.videoWidth = Math.min(this.youtubePlayer.nativeElement.clientWidth, 1200); //videoWidth = div size or 1200px if div larger

      this.videoHeight = this.videoWidth * 0.6; //To keep the aspect ratio
      //this.changeDetectorRef.detectChanges();
    }
  }
}

//Appeler onResize quand on appuie sur un changement d'item dans le carousel