import { Component } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Game } from 'src/app/models/game';
import { userDTO} from 'src/app/models/userDTO';
import { GameService } from 'src/app/services/game.service';
import { Options } from 'ngx-slider-v2';

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
  developer : string = '';
  gameArray: Game[] = [];
  userArray: userDTO[] = [];
  minPrice: number = 40;
  maxPrice: number = 60;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  constructor(private dataService: ApiserviceService, private gameService : GameService) {}

  search(): void {
    // Your search logic here based on searchQuery and searchType
    if (this.searchType === 'user') {
      this.userArray = [];
      console.log(this.searchQuery);
      this.dataService.getUsers().subscribe((res) => {
      this.searchResults = res.data;
      for(let i = 0; i<Object.keys(this.searchResults).length; i++){
        if (String(this.searchResults[i].username) === String(this.searchQuery)) {
          this.userArray.push(this.searchResults[i]);
        }
      }
      console.log(this.userArray);
      });

    } else if (this.searchType === 'game') {
        this.gameArray = [];
        this.dataService.researchGame(this.gameName, this.minPrice, this.maxPrice, this.developer).subscribe((res) => {
        this.searchResults = res.data;
        console.log(this.searchResults);
        for(let i = 0; i<Object.keys(this.searchResults).length; i++){
          this.gameArray.push(this.gameService.getGameById(this.searchResults[i].ID));
        }
        console.log(this.gameArray);
      });
    }
  }
}