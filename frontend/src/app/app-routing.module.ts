import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './views/game-list/game-list.component';
import { GamefullComponent } from './views/gamefull/gamefull.component';
import { HomeComponent } from './views/home/home.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [

  {path:'create', component:CreateComponent},
  {path:'create/:id', component:CreateComponent},
  {path:'read', component:ReadComponent},
  {path: '', component: HomeComponent},
  {path: 'store', component: GameListComponent},
  {path: 'game/:id', component : GamefullComponent}
   ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }