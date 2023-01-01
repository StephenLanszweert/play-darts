import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, NotAuthorizedComponent } from 'libs/ui-kit/src/lib/components';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@playdarts/dashboard').then((m) => m.DashboardModule),
  },
  {
    path: 'game',
    loadChildren: () => import('@playdarts/game').then((m) => m.GameModule),
  },
  {
    path: 'notauthorized',
    component: NotAuthorizedComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      initialNavigation: 'enabledBlocking',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
