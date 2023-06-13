import { Component } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

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

  constructor(private dataService: ApiserviceService) {}

  search(): void {
    // Your search logic here based on searchQuery and searchType
    if (this.searchType === 'user') {
      this.dataService.getUserData(this.searchQuery).subscribe((res) => {
      this.searchResults = res.data;
      });
    } else if (this.searchType === 'game') {
        this.dataService.researchGame(this.gameName, this.minPrice, this.maxPrice, this.developer).subscribe((res) => {
        this.searchResults = res.data;
        console.log(this.searchQuery);
      });
    }
  }
}