import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamefull',
  templateUrl: './gamefull.component.html',
  styleUrls: ['./gamefull.component.css']
})

export class GamefullComponent {
  protected rating: number = 0;
  public prd_idx : number
  public game : Game
  @ViewChild('youtubePlayer') youtubePlayer: ElementRef | undefined;
  videoHeight: number | undefined;
  videoWidth: number | undefined;
  @ViewChild('youtubeVideo') youtubeVideo: YouTubePlayer | undefined;
  @ViewChild('carousel') carousel: ElementRef | undefined;

  constructor(private activatedroute : ActivatedRoute, private service : GameService, private router : Router) { 
    this.prd_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
    this.game = service.getPrdByIndex(this.prd_idx-1)
  }
    
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));  //Call onResize everytime the window is resized

    this.carousel?.nativeElement.addEventListener('slid.bs.carousel', this.onChangeItem.bind(this)); //slid when it has finished the transition, slide when it begins

  }

  onResize(): void {
    if(this.youtubePlayer != null) {  //If the component exists
      this.videoWidth = Math.min(this.youtubePlayer.nativeElement.clientWidth, 1200); //videoWidth = div size or 1200px if div larger

      this.videoHeight = this.videoWidth * 0.6; //To keep the aspect ratio
    }
  }

  onChangeItem(): void {
    if(this.youtubePlayer?.nativeElement.classList.contains('active')) {  //If we are watching the video
      this.youtubeVideo?.playVideo();
    } 
    else {
      this.youtubeVideo?.pauseVideo();
    }
    this.onResize();
  }
  calldev() {
    this.service.devpage(this.game.dev);
  }
  setrating(rating: number):void{
    this.rating = rating;
  }

}