import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap } from 'rxjs';
import UserInfo from "../models/UserInfo";
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl$ = this.store.select(fromAuth.selectBaseUrl);

  constructor(
    private store: Store<fromAuth.AuthState>,
    private http: HttpClient
  ) {}

  login(username: string, password: string) {
    const request = {
      username,
      password
    };
    
    return this.baseUrl$.pipe(
      filter(baseUrl => baseUrl !== undefined && baseUrl !== null),
      switchMap(baseUrl => this.http.post<UserInfo>(`${baseUrl}/Auth/login`, request))
    );
    
  }
}
