import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesOverviewComponent, StandardGameComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GamesOverviewComponent,
      },
      {
        path: 'standardgame',
        component: StandardGameComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule { }
