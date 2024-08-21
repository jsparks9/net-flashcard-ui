import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { combineLatest, filter, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  getDecks() {
    throw new Error('Method not implemented.');
  }
  baseUrl$ = this.store.select(fromAuth.selectBaseUrl);
  user$ = this.store.select(fromAuth.selectUser);
  
  constructor(
    private store: Store<fromAuth.AuthState>,
    private http : HttpClient
  ) { }

  getAllDecks() {
    return this.baseUrl$.pipe(
      filter(baseUrl => baseUrl !== undefined && baseUrl !== null),
      switchMap(baseUrl => this.http.get<[Deck]>(`${baseUrl}/Deck`))
    );
  }
  getMyDecks() {
    return combineLatest([this.user$, this.baseUrl$]).pipe(
      filter(([user, baseUrl]) => user !== null && baseUrl !== undefined && baseUrl !== null),
      switchMap(([user, baseUrl]) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${user.token}`);
        return this.http.get<[Deck]>(`${baseUrl}/Deck/getmydecks`, { headers });
      })
    );
  }
  
  

}
