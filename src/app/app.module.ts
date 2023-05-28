import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './views/game/game.component';
import { GameListComponent } from './views/game-list/game-list.component';
import { GamefullComponent } from './views/gamefull/gamefull.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GamefullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
