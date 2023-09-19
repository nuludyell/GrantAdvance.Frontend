import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { LoginModel } from '../models/users/login.model';
import appConfig from '../../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url =  appConfig.url + 'users/';
  constructor(private httpClient: HttpClient) {}
  
  public login(loginModel: LoginModel): Observable<void> {
    console.log('ru;',this.url);
    return this.httpClient
      .post<string>(this.url + 'login', loginModel)
      .pipe(
        map(result => {
          localStorage.setItem('token', JSON.stringify(result));
        })
      );
  }

  public logout(): Observable<void> {
    return of(localStorage.removeItem('token'));
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getAccessToken() : string {
    var token = JSON.parse(localStorage.getItem('token')!);

    if (!token)
    {
      return '';
    }

    return token['accessToken'];
  }
}
