import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './views/game-list/game-list.component';
import { GamefullComponent } from './views/gamefull/gamefull.component';

const routes: Routes = [
  {
    path: 'store', 
    component: GameListComponent,
    children: [
       {
          path:'game/:id', component : GamefullComponent
       }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
