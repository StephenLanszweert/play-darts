import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { off } from 'process';

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.checkState(state);
  }

  canActivateChild(
    _childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.checkState(state);
  }

  checkState(state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLogged$
      .pipe(
        tap(value => {
          // if not logged...
          if (!value) {
            // redirect to login
            console.log('access deny');
            this.router.navigateByUrl('/');
          }
        })
      );
    return of(true);
  }
}
