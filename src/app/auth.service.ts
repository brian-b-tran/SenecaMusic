import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';
import {RegisterUser} from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) {}
  getToken():string{
    return localStorage.getItem('access_token');
  }

  readToken() :any{
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('access_token');
    if(token){
      return true;
    }
    else{
      return false;
    }
  }

  login (user: User) : Observable<any>{
    let userAPIBaseLogin = environment.userAPIBase + '/login';
    console.log(`requesting login from api`);
    return this.http.post<any>(userAPIBaseLogin, user);
  }

  logout(){
    localStorage.removeItem('access_token');
  }

  register(registerUser: RegisterUser) : Observable<any> {
    let userAPIBaseRegister = environment.userAPIBase + '/register';
    console.log(`requesting registration from api`);
    return this.http.post<any>(userAPIBaseRegister, registerUser);
  }

}
