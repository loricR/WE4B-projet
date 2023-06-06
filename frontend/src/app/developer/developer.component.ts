import { Component, Input } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Game } from '../models/game';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  constructor(private apiService: ApiserviceService, private router : Router) {}

  @Input() profilePictureUrl!: string;
  @Input() username!: string;
  @Input() isDeveloper!: boolean;
  @Input() userId!: number;

  showGames: boolean = false;
  showSuccessMsg: boolean = false;
  games: Game[] = [];

  imageLinks: string[] = [];
  categories: string[] = [];

   
  successMsg: string = '';

  predefinedCategories: string[] = ['Solo', 'Multiplayer', 'Adventure', 'FPS', 'Puzzle', 'Open World', 'RPG', 'Strategy', 'Simulation','MOBA', 'Retro'];
  

  userForm = new FormGroup({
    gameName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    longDescription: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    videoCode: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required)
  });

  addImageLink(): void {
    const controlName = `image${this.imageLinks.length}`;
    (this.userForm.controls as any)[controlName] = new FormControl('', Validators.required);


    this.imageLinks.push(controlName);
  }
  
  addCategory(): void {
    const controlName = `category${this.categories.length}`;
    (this.userForm.controls as any)[controlName] = new FormControl('', Validators.required);

    this.categories.push(controlName);
  }

  redirectToGamePage(gameId: number): void {

    console.log(gameId)
    this.router.navigate(['/store', gameId]);
  }

  toggleGames(): void {
    if (this.isDeveloper) {
      this.showGames = !this.showGames;
      if (this.showGames) {
        this.getGamesByDeveloper();
      }
    }
    console.log(this.games);
  }

  getGamesByDeveloper(): void {
    // Call the API service to fetch games made by the developer
    this.apiService.getGamesByDeveloper(this.userId).subscribe(
      (response) => {
        this.games = response.data;
      },
      (error) => {
        console.log('Error fetching games:', error);
      }
    );
  }

  // Function called to dismiss the success message
  closeSuccessMsg(): void {
    this.showSuccessMsg = false;
    
    // Programmatically trigger a click event on the close button
    const successMsgElement = document.getElementById('successMsg');
    if (successMsgElement) {
      const closeButton = successMsgElement.querySelector('.btn-close');
      if (closeButton) {
        closeButton.dispatchEvent(new Event('click'));
      }
  }
  }

  addGameByDeveloper(): void {

    console.log(this.userForm.value.description)
    console.log(this.userForm.value.gameName)

    // Assign the userId value to the userId control
    this.userForm.patchValue({
      userId: this.userId.toString()
    });

    console.log(this.userForm.value.userId)

    if (this.userForm.valid) {
      const gameName = this.userForm.get('gameName')?.value;
      const gameDescription = this.userForm.get('gameDescription')?.value;
  
      if (gameName && gameDescription) {
        const newGame: [string, string] = [gameName, gameDescription];
  
        // Convert userId back to a number
        const userId = Number(this.userForm.get('userId')?.value);
  
        console.log("add game !");
    
        this.apiService.addGameByDeveloper({...this.userForm.value, userId}).subscribe(
          (response) => {
            console.log(response.message);
            this.games.push(response);
            this.userForm.patchValue({
              gameName: '',
              description: ''
            });
            this.toggleGames();
            
            // Show the success message
            this.showSuccessMsg = true; 
            this.successMsg = `Jeu ${gameName} ajouté ! :)`

            // Start a timer to add the fade-out class after 5 seconds
            setTimeout(() => {
              // Simulate click event to dismiss the success message
              this.closeSuccessMsg(); 
            }, 5000);

          },
          (error) => {
            console.log('Error adding game:', error);
          }
        );
      }
    }
  }
  
  
}


