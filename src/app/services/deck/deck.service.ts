import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  baseUrl$ = this.store.select(fromAuth.selectBaseUrl);
  
  constructor(
    private store: Store<fromAuth.AuthState>,
    private http : HttpClient
  ) { }

  getAllDecks() {
    return this.http.get<[Deck]>(`${this.baseUrl$}/company`)
  }

}
