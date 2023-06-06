import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './views/game-list/game-list.component';
import { GamefullComponent } from './views/gamefull/gamefull.component';
import { HomeComponent } from './views/home/home.component';
import { SignupComponent } from './views/signup/signup.component';
import { ResearchPageComponent } from './views/research-page/research-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'store', component: GameListComponent},
  {path: 'register', component: SignupComponent},
  {path: 'game/:id', component : GamefullComponent},
  {path: 'research', component : ResearchPageComponent}
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }