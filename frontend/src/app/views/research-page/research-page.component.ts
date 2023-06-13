import { Component } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css']
})
   
export class ResearchPageComponent {
  searchQuery!: string;
  searchResults: any;

  constructor(private dataService: ApiserviceService) {}

  search(): void {
    this.dataService.getAllData2(this.searchQuery).subscribe((res) => {
        this.searchResults = res.data;
      });
  }
}