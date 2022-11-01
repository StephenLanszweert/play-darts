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
    path: 'game',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@playdarts/dashboard').then((m) => m.DashboardModule),
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
