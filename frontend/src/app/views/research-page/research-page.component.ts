import { Component } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css']
})
   
export class ResearchPageComponent {
  searchQuery!: string;
  searchType: string = 'user'; //Default to user search
  searchResults: any;

  gameName : string = '';
  minPrice : number = 0;
  maxPrice : number = 100;
  developer : string = '';
  gameArray: Game[] = [];
  constructor(private dataService: ApiserviceService, private gameService : GameService) {}

  search(): void {
    // Your search logic here based on searchQuery and searchType
    if (this.searchType === 'user') {
      this.dataService.getUserData(this.searchQuery).subscribe((res) => {
      this.searchResults = res.data;
      });
    } else if (this.searchType === 'game') {
        this.gameArray = [];
        this.dataService.researchGame(this.gameName, this.minPrice, this.maxPrice, this.developer).subscribe((res) => {
        this.searchResults = res.data;
        for(let i = 0; i<Object.keys(this.searchResults).length; i++){
          this.gameArray.push(this.gameService.getGameById(this.searchResults[i].ID));
        }
        console.log(this.gameArray);
      });
    }
  }
}