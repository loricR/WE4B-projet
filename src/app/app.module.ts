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
import { CommonModule } from '@angular/common';
import { SignupComponent } from './views/signup/signup.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ResearchBarComponent } from './views/research-bar/research-bar.component';
import { ResearchPageComponent } from './views/research-page/research-page.component';
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GamefullComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    ResearchBarComponent,
    ResearchPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
