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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GamefullComponent,
    NavbarComponent,
    HomeComponent,
    CreateComponent,
    ReadComponent
  ],
imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    HomeComponent,
    SignupComponent,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
