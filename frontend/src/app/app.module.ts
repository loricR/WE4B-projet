import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './views/game/game.component';
import { GameListComponent } from './views/game-list/game-list.component';
import { GamefullComponent } from './views/gamefull/gamefull.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { HomeComponent } from './views/home/home.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';

import { CommonModule } from '@angular/common';
import { SignupComponent } from './views/signup/signup.component';
<<<<<<< HEAD:frontend/src/app/app.module.ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiserviceService } from './apiservice.service';
import { HttpClientModule } from '@angular/common/http';

=======
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ResearchBarComponent } from './views/research-bar/research-bar.component';
import { ResearchPageComponent } from './views/research-page/research-page.component';
>>>>>>> 04e438f1 (debat barre de recherche):src/app/app.module.ts
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GamefullComponent,
    NavbarComponent,
    HomeComponent,
<<<<<<< HEAD:frontend/src/app/app.module.ts
    CreateComponent,
    ReadComponent,
    SignupComponent
=======
    SignupComponent,
    ResearchBarComponent,
    ResearchPageComponent,
>>>>>>> 04e438f1 (debat barre de recherche):src/app/app.module.ts
  ],
imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
