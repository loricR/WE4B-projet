import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDTO } from './models/gameDTO';
import { Game } from './models/game';
import { CommentDTO } from './models/CommentDTO';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

    // connect frontend to backend

    apiUrl = 'http://localhost:3000/user';
    picUrl = 'http://localhost:3000/api/save-image';
    gameApiUrl = 'http://localhost:3000/user/games';
    gameUrl = 'http://localhost:3000/recherche/game';



    constructor(private _http:HttpClient) { }

    // get all data

    getAllData():Observable<any>{

      return this._http.get(`${this.apiUrl}`);
    }

    getUserData(id:any):Observable<any>{

      return this._http.get(`${this.apiUrl}/${id}`);
    }
    // create data

    createData(data:any):Observable<any>{

      console.log(data,'createAPI');

      return this._http.post(`${this.apiUrl}`,data);
    }

    // delete data

    deleteData(id:any):Observable<any> {

      let ids=id;
      return this._http.delete(`${this.apiUrl}/${ids}`);

    }

    // update data
    updateData(data:any, id:any):Observable<any>{
      let ids = id;
      return this._http.put(`${this.apiUrl}/${ids}`,data);
    }

    // get single user data
    getSingleData(id:any):Observable<any>{
      let ids = id;
      return this._http.get(`${this.apiUrl}/${ids}`);
    }

    getGamesByDeveloper(developerId: number): Observable<any> {
      const url = `${this.gameApiUrl}/${developerId}`; 
      return this._http.get(url);
    }

    researchGameById(gameId: any): Observable<any> {
      const url = `${this.gameUrl}/${gameId}`;
      return this._http.get(url);
    }

    researchGame(gameName: any, minPrice: any, maxPrice: any, developer: any): Observable<any> {
      const url = `${this.gameUrl}/${gameName}/${minPrice}/${maxPrice}/${developer}`;
      return this._http.get(url);
    }

    addGameByDeveloper(game : Game): Observable<any> {
      const url = `${this.gameApiUrl}/${game.dev}`;

      console.log("Api service add game");
      return this._http.post(url, game);
    }

    uploadFile(file: File) {
      const formData = new FormData();
      formData.append('file', file);
      return this._http.post<any>(`${this.apiUrl}/upload`, formData);
    }

    getUserInfo(id : number):Observable<any> {
      const url = `${this.apiUrl}/userinfo/${id}`; 
      return this._http.get(url);
    }
}
