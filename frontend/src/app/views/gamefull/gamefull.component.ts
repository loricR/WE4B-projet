import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { CommentDTO } from 'src/app/models/CommentDTO';
import { userDTO } from 'src/app/models/userDTO';
import { CommentWithUser } from 'src/app/models/CommentWithUser';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-gamefull',
  templateUrl: './gamefull.component.html',
  styleUrls: ['./gamefull.component.css']
})

export class GamefullComponent {
  protected rating: number = 1;
  public average_rating: number = 0;
  public average_rating_round: number = 0;

  public prd_idx : number = 0;
  public game : Game = new Game();
  public allComments: CommentDTO[] = [];
  public processedComments : CommentWithUser[] = [];

  public commentFromUser: CommentDTO = new CommentDTO("",0,0,0);
  public comment_string: string = '';
  public pageLoaded: boolean = false;
  public hasAlreadyCommented: boolean = false;
  public comm: boolean = false;

  public userArray: userDTO[] = []
  public userArray2: userDTO[] = [] // To get the profile picture
  public user: userDTO = new userDTO(21,"louis","louis",1,"louis.rolland@utbm.fr","./assets/images/Pesto_tete.png"); // Default user
  public user2: userDTO = new userDTO(21,"louis","louis",1,"louis.rolland@utbm.fr","./assets/images/Pesto_tete.png"); // Default user for profile picture 

  public profilePic: string = "";

  public hasBoughtObject:number[] = []; 
  public hasBoughtFinal:boolean = false;

  public buyBool:boolean = false;



  @ViewChild('youtubePlayer') youtubePlayer: ElementRef | undefined;
  videoHeight: number | undefined;
  videoWidth: number | undefined;
  @ViewChild('youtubeVideo') youtubeVideo: YouTubePlayer | undefined;
  @ViewChild('carousel') carousel: ElementRef | undefined;

  constructor(private activatedroute : ActivatedRoute, private tokenStorage: TokenStorageService, private service : GameService, private router : Router) { 
    if(service.isReadyImediately()) {
      this.pageLoaded = true;
      this.prd_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')

      this.game =this.service.getGameById(this.prd_idx);

      this.getCommentsFromGame(this.prd_idx);

      if(this.tokenStorage.getToken()) {
        this.user = this.tokenStorage.getUser(); // gets the user info
        console.log("check récupération user : ",this.user);
      }

      // this.hasAlreadyCommented = this.processedComments.some(processedComment => processedComment.comment.ID_user === this.user.ID);
      // console.log("Il a déjà commenté : ",this.hasAlreadyCommented, "  et  id = ", this.user.ID);
      // console.log("allComments :",this.processedComments);


      this.getUserInfo();

      this.pageLoaded = true;

      // this.AlreadyCommented()

      
    }
    else {
      this.service.isReady().subscribe((isReady: boolean) => {
        if (isReady) {
          //Game service ready
          this.prd_idx = parseInt(this.activatedroute.snapshot.paramMap.get('id') || '0')
          //this.game = service.getPrdByIndex(this.prd_idx-1)

          this.game =this.service.getGameById(this.prd_idx);

          this.getCommentsFromGame(this.prd_idx);
          this.pageLoaded = true;

          if(this.tokenStorage.getToken()) {
            this.user = this.tokenStorage.getUser(); // gets the user info
            console.log("check récupération user : ",this.user);
          }

          // this.hasAlreadyCommented = this.processedComments.some(processedComment => processedComment.comment.ID_user === this.user.ID);
          // console.log("Il a déjà commenté : ",this.hasAlreadyCommented, "  et  id = ", this.user.ID);
          // console.log("allComments :",this.processedComments);

          // this.AlreadyCommented()

          this.getUserInfo();

        }
      });
    }

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

    console.log("RESULTAT : ", this.AlreadyCommented());
  }

  getAverageRating(): void {
    let count = 0;
    let avg = 0;

    this.allComments.forEach(comment => {
      count++
      avg+=comment.note
    });

    this.average_rating = avg / count

    this.average_rating = parseFloat(this.average_rating.toFixed(2));

    this.average_rating_round = Math.round(this.average_rating);
    console.log(" Moyenne : ",this.average_rating);
  }


  postCommForm() {
    this.commentFromUser.content = this.comment_string;
    this.comment_string = '';

    this.commentFromUser.ID_game= this.prd_idx;

    // CHANGER L'ID LORSQUE CONNEXION FAITE
    this.commentFromUser.ID_user = this.user.ID;
    this.commentFromUser.note = this.rating;

    this.rating = 0;
    this.setrating(0);

    this.postComm(this.commentFromUser);
  }

  postComm(data:CommentDTO) {
    //this.service2.postComm(data);

    this.AlreadyCommented();
    if(this.hasAlreadyCommented) {
      return;
    }

    this.service.postComm(data).subscribe(
      (response) => {
        console.log('Comment uploaded successfully:', response);
      },
      (error) => {
        console.log('Error uploading Comment ...', error);
      }
    );

    // Empty all arrays else double lists
    this.allComments = [];
    this.processedComments = [];
    this.comm = true;

    this.getCommentsFromGame(this.prd_idx);
    
  }

  getCommentsFromGame(id:number) {

    this.service.getAllComments(id).subscribe(
      (response) => {
        this.allComments = response.data;
        this.getAverageRating();

        this.allComments.forEach((comments) => {
          this.service.getUserByID(comments.ID_user).subscribe((user) => {
            // Create a new object with comment and user details
            const commentWithUser = {
              comment : comments,
              user: user.data
            };
    
            // Push the new object to an array
            this.processedComments.push(commentWithUser);
          });
        });
         
        //console.log(this.processedComments);
        
      },
      (error) => {
        console.log('Error fetching all comments:', error);
      }
    );  
  }

  AlreadyCommented():boolean {

    console.log("ID user :", this.user.ID)
    console.log(this.processedComments);

    this.processedComments.forEach((processedComment) => {
      if (processedComment.comment.ID_user === this.user.ID) {
        this.hasAlreadyCommented = true;
      }
      console.log("Comment id user : ",processedComment.comment.ID_user);
    });

    return this.hasAlreadyCommented
    
  }

  closeSuccessMsg(): void {

    // Programmatically trigger a click event on the close button
    const successMsgElement = document.getElementById('successMsg');
    if (successMsgElement) {
      const closeButton = successMsgElement.querySelector('.btn-close');
      if (closeButton) {
        closeButton.dispatchEvent(new Event('click'));
      }
    }
  }

  getUserInfo() {

    
    

    this.service.getUserInfo(this.user.ID).subscribe(
      (response) => {
        this.userArray2 = response.data;
        console.log(this.userArray2);

        this.user2 = this.userArray2[0];

        const searchHasBought: number[] = [];
        searchHasBought[0] = this.user2.ID;
        searchHasBought[1] = this.prd_idx;

        const button2 = document.getElementById('postcomm') as HTMLButtonElement;
        button2.disabled = true;

        this.service.getHasBought(searchHasBought).subscribe(
          (response) => {
            const result:number[] = response.data;
            //console.log("hasBought : ", result);

            if(result.length > 0) {
              const button = document.getElementById('acheter') as HTMLButtonElement;
              button.disabled = true;

              this.hasBoughtFinal = true;

              const buttonPost = document.getElementById('postcomm') as HTMLButtonElement;
              buttonPost.disabled = false;
            }
    
            //this.user2 = this.userArray2[0];
    
            return;
          },
          (error) => {
            const buttonBuy = document.getElementById('acheter') as HTMLButtonElement;
            buttonBuy.disabled = true;

            const buttonPost = document.getElementById('postcomm') as HTMLButtonElement;
            buttonPost.disabled = true;

            console.log('Error fetching user info:', error);
          }
        );

        return;
      },
      (error) => {
        console.log('Error fetching user info:', error);
      }
    );
  }

  buyGame() {

    this.hasBoughtObject[0] = this.user2.ID;
    this.hasBoughtObject[1] = this.prd_idx;

    this.service.bought(this.hasBoughtObject).subscribe(
      (response) => {
        console.log('Game Bought !!', response);
      },
      (error) => {
        console.log('Error buying game', error);
      }
    );

    const button = document.getElementById('acheter') as HTMLButtonElement;
    button.disabled = true;

    this.buyBool = true;

    const button2 = document.getElementById('postcomm') as HTMLButtonElement;
    button2.disabled = false;

  }

}