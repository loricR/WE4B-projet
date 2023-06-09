import { Component, Input } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Game } from '../models/game';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameDTO } from '../models/gameDTO';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {
  constructor(private http: HttpClient, private apiService: ApiserviceService, private router: Router) {}


  @Input() profilePictureUrl!: string;
  @Input() username!: string;
  @Input() isDeveloper!: boolean;
  @Input() userId!: number;

  showGames: boolean = false;
  showSuccessMsg: boolean = false;
  showAddGameSection: boolean = false;
  isSelectedFile: boolean = true;

  games: Game[] = [];
  selectedFile: File | null = null;

  gameImg:string = '../assets/images/meta_rifle.jpg';

  images: string[] = [];
  imageFiles: File[] = [];

  successMsg: string = '';

  categories: string[] = [];
  predefinedCategories: string[] = ['Solo', 'Multiplayer', 'Adventure', 'FPS', 'Puzzle', 'Open World', 'RPG', 'Strategy', 'Simulation', 'MOBA', 'Retro'];




  userForm = new FormGroup({
    gameName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    longDescription: new FormControl(''),
    price: new FormControl('', Validators.required),
    videoCode: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required)
  });


  addCategory(event: any): void {
    const category = event.value;
    this.categories.push(category);
    this.predefinedCategories = this.predefinedCategories.filter(c => c !== category);
  }
  
  
  

  redirectToGamePage(gameId: number): void {
    console.log(gameId);
    this.router.navigate(['/store', gameId]);
  }

  toggleGames(): void {
    if (this.isDeveloper) {
      this.showGames = !this.showGames;
      if (this.showGames) {
        this.getGamesByDeveloper();
      }
    }
    console.log(this.categories);
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


  onFileSelected(event: any): void {

    this.isSelectedFile = false;


    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        //this.images.push(e.target.result);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  isUploading: boolean = false;

  uploadFile() {
    if (this.selectedFile && !this.isUploading) {
      this.isUploading = true; // Set the flag to indicate that file upload is in progress

      this.isSelectedFile = true;

      this.apiService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          // Handle the response from the server if needed
          console.log('File uploaded successfully:', response);

          // Add the image URL to the images array
          const newFileName = response.newFileName;
          if (newFileName) {
            this.images.push(`../assets/images/${newFileName}`);
          }

          this.isUploading = false; // Reset the flag after successful upload
        },
        (error) => {
          console.log('Error uploading file:', error);
          this.isUploading = false; // Reset the flag in case of upload error
        }
      );
    }
  }
  
  addGameByDeveloper(): void {
  
    // Assign the userId value to the userId control
    this.userForm.patchValue({
      userId: this.userId.toString()
    });
  
    console.log(this.userForm.value.userId);
  
    if (!this.userForm.valid) {
      return;
    }

    console.log('Images uploaded:', this.images);

    const gameName = this.userForm.get('gameName')?.value;
    const gameDescription = this.userForm.get('description')?.value;
    const longDescription = this.userForm.get('longDescription')?.value || '';
    const price = parseInt(this.userForm.get('price')?.value || "0");
    const videoCode = this.userForm.get('videoCode')?.value || '';

    if (!gameName || !gameDescription) {
      return;
    }

    const newGame: Game = new Game(
      0, // ID is initialized to 0 as it will be assigned by the server
      gameName,
      gameDescription,
      this.userId,
      longDescription,
      price,
      videoCode,
      this.images.map((imagePath) => imagePath.replace('data:', '/assets')), // Modify the image paths
      this.categories
    );

    const newGameDTO: GameDTO = new GameDTO(
      0,
      gameName,
      gameDescription,
      this.userId,
      longDescription,
      price,
    );

    console.log('Adding game!', newGame);
    console.log('gameName value:', this.userForm.get('gameName')?.value);

    this.apiService.addGameByDeveloper(newGame).subscribe(
      (response) => {
        console.log(response.message);
        const gameId = response.id;
        newGame.ID = gameId;
        this.games.push(newGame);
        this.userForm.patchValue({
          gameName: '',
          description: '',
          longDescription: '',
          price: '',
          videoCode: ''
        });
        this.toggleGames();

        this.showAddGameSection = false;

        // Show the success message
        this.showSuccessMsg = true;
        this.successMsg = `Jeu ${gameName} ajouté ! :)`;

        this.images = [];
        this.categories = [];

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