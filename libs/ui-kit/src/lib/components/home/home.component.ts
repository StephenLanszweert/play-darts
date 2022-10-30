import { Component, OnInit } from '@angular/core';
import { IUser } from '@playdarts/core';
import { AuthService } from 'libs/core/authentication/src';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'playdarts-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isAuthenticated$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$.pipe(
      tap((res) => console.log(res))
    );
    this.authService.token$.subscribe((res) => console.log(res));
  }

  login() {
    console.log("test");
    this.authService.authenticateUser({ username: "stephenlan", password: "stephen123" } as IUser).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
      } else {
        // this.router.navigate(['login']);
      }
    })
  }

  logout() {
    this.authService.logout();
  }

  register() {

  }
}
