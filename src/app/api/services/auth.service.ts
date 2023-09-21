import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { LoginModel } from '../models/users/login.model';
import appConfig from '../../../assets/config/config.json';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url =  appConfig.url + 'users/';
  constructor(private httpClient: HttpClient) {}
  
  public login(loginModel: LoginModel): Observable<void> {
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

  public getAccessToken() : string | null {
    var token = JSON.parse(localStorage.getItem('token')!);

    if (!token)
    {
      return null;
    }

    return token.accessToken;
  }

  private getDecodeToken(accessToken: string): { [key: string]: string } {
    return jwtDecode(accessToken);
  }

  private getExpiryTime(): number | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    const decodedToken = this.getDecodeToken(JSON.parse(token).accessToken);
    return decodedToken ? +decodedToken['exp']: null;
  }

  public isTokenExpired(): boolean {
    const expiryTime: number | null = this.getExpiryTime();

    if (expiryTime === null) {
      return true;
    }

    return (1000 * expiryTime) <= (new Date()).getTime();
  }
}
