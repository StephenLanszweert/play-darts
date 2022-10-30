import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, Language } from '@playdarts/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;

  public isAuthenticated$: Observable<boolean>;
  public userData$ = new Subject<IUser>();
  token$: Subject<string | null> = new Subject<string | null>();

  constructor(private http: HttpClient) {
    this.loadToken();
    this.isAuthenticated$ = this.token$.pipe(
      tap((val) => console.log("val", val)),
      map(val => !!val && !this.tokenExpired(val))
    )
  }

  registerUser(user: IUser) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, { headers: headers });
  }

  authenticateUser(user: IUser) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3333/api/users/login', user, { headers: headers }).pipe(
      tap((res: any) => this.token$.next(res.token))
    );
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/profile', { headers: headers });
  }

  storeUserData(token: string, user: IUser) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.userData$.next(user);
    this.token$.next(token);

  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    if (!token) return;
    this.token$.next(token);
  }

  private tokenExpired(token: string) {
    if (!token) return false;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    console.log(expiry);
    return expiry * 1000 > Date.now();
  }

  logout() {
    this.token$.next(null);
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
  }

  get isLogged$(): Observable<boolean> {
    return this.token$.pipe(
      map(value => !!value && !this.tokenExpired(value))
    )
  }
}
