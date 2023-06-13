import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentDTO } from '../models/CommentDTO';




@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameArray: Game[] = [];

  isDoneGenerating: boolean = false;

  gameApiUrl = 'http://localhost:3000/games';
  commentApiUrl = 'http://localhost:3000/comment';


  constructor(private router: Router, private _http:HttpClient) { 
    //this.gameArray = [];

    //Modèle incluant cpu, gpu et ram : 
    // this.gameArray.push(new Game(1, 'Counter Strike Global Offensive', '../assets/images/csgo.png', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur'], 'edYCtaNueQY',"Intel Core 2 Duo E6600", "AMD Phenom X3 8750 or better", "2 GB"));
    // this.gameArray.push(new Game(2, 'CSS', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur', 'Aventure'], 'XMmQ2DTGHOk',"Intel Core i7 ", "Nvidia Geforce GTX560", "5 GB"));
    // this.gameArray.push(new Game(3, 'CS2', '../assets/images/meta_rifle.jpg', 'La description courte.', 'La description longue.', 12, 'nom du dev', ['FPS', 'Multijoueur'], '2iivKSgqlgs',"Intel Core i9 ", "Nvidia Geforce RTX4090 Ti", "34 GB"));
    
    //this.gameArray.push(new Game(1,'CSGO', 'La description courte.', 22, 'La description longue.', 12, 'edYCtaNueQY', ['../assets/images/csgo.png'], ['FPS', 'Multijoueur'],"Intel Core i9 ", "Nvidia Geforce RTX4090 Ti", "34 GB" ));

    this.getAllGames().subscribe(
      (response: any) => {
        const fetchedGames = response.data;
    
        const gameRequests: Observable<Game>[] = fetchedGames.map((gameData: any) => {
          const id_game = gameData.ID;
          const categories$ = this.getCategories(id_game);
          const images$ = this.getImages(id_game);
    
          // Used for synchronization
          return forkJoin([categories$, images$]).pipe(
            map(([categoriesResponse, imagesResponse]: [any, any]) => {
              const categories = categoriesResponse.data;
              const images = Array.isArray(imagesResponse.data)
                ? imagesResponse.data.map((image: any) => image.link)
                : [];
    
              return new Game(
                gameData.ID,
                gameData.name,
                gameData.description,
                gameData.dev,
                gameData.longDescription,
                gameData.price,
                gameData.videoCode,
                images,
                categories,
                gameData.cpu,
                gameData.gpu,
                gameData.ram
              );
            })
          );
        });
    
        forkJoin(gameRequests).subscribe(
          (games: Game[]) => {
            // Assign each game to the game's array
            this.gameArray.push(...games);
    
            this.gameArray.forEach((game: Game) => {
              console.log('First picture', game.images[0]);
            });
    
            console.log('test dans forkjoin parce que pkp', this.gameArray[2]);

          },
          (error) => {
            console.log('Error fetching games:', error);
          }
        );
      },
      (error) => {
        console.log('Error fetching games:', error);
      }
    );
    

    console.log("test après sybscribe ", this.gameArray[2]);

  }

  categories: string[] = [];
  images: string[] = [];

  image_ie : string[] = ['../assets/images/csgo.png'];

  getGames(): Game[] {
    return this.gameArray;
  }

  // getPrdByIndex(idx : number): Game {
  //   return this.gameArray[idx];
  // }


  getGameById(id: number): Game {

    //console.log(" Dans getGameID : " , this.gameArray);

    console.log("Dans getGameID : ", this.gameArray[2]);


    const game = this.gameArray.find( ({ID}) => ID === id);

    console.log(" TEST FIND : ", this.gameArray.find( ({ID}) => ID === id));
    console.log("id : ", id)

    
    return game ? game : new Game(1, 'Counter Strike Global Offensive', 'DESCRIPTIONNN', 21, 'La description longue.', 12, 'edYCtaNueQY', ['edYCtaNueQY'], ['FPS', 'Multijoueur'],"Intel Core 2 Duo E6600", "AMD Phenom X3 8750 or better", "2 GB"); // Renvoie un nouvel objet Game vide si aucun jeu correspondant n'est trouvé
  }

  devpage(id : number) : void{
    this.router.navigate(['/', 'developer', id])
  }

  getAllGames(): Observable<any> {

    return this._http.get(`${this.gameApiUrl}`);
  }

  getCategories(ID:number): Observable<any> {

    return this._http.get(`${this.gameApiUrl}/categories/${ID}`);
  }

  getImages(ID:number): Observable<any> {

    return this._http.get(`${this.gameApiUrl}/images/${ID}`);
  }

  postComm(data:CommentDTO): Observable<any> {
    const url = `${this.commentApiUrl}`;

    console.log("JE SUIS AU SERVICE !!!")
    return this._http.post(url, data);
  }

  getAllComments(ID:number): Observable<any> {

    return this._http.get(`${this.commentApiUrl}/${ID}`);
  }


}
