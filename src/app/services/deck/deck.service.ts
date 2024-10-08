import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { combineLatest, filter, switchMap } from 'rxjs';
import Card from 'src/app/models/Card';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
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

  createDeck(deck: { deckName: string; description: string; cards: Card[] }) {
    return combineLatest([this.user$, this.baseUrl$]).pipe(
      filter(([user, baseUrl]) => user !== null && baseUrl !== undefined && baseUrl !== null),
      switchMap(([user, baseUrl]) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${user.token}`)
          .set('Content-Type', 'application/json');
        return this.http.post(`${baseUrl}/Deck`, deck, { headers });
      })
    );
  }

  patchDeck(deck: { deckName: string; description: string }, deckId: string) {
    return combineLatest([this.user$, this.baseUrl$]).pipe(
      filter(([user, baseUrl]) => user !== null && baseUrl !== undefined && baseUrl !== null),
      switchMap(([user, baseUrl]) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${user.token}`)
          .set('Content-Type', 'application/json');
        return this.http.patch(`${baseUrl}/Deck/${deckId}`, deck, { headers });
      })
    );
  }

  patchCard(card: { QuizText: string; Answer: string; Image: string }, cardId: string) {
    return combineLatest([this.user$, this.baseUrl$]).pipe(
      filter(([user, baseUrl]) => user !== null && baseUrl !== undefined && baseUrl !== null),
      switchMap(([user, baseUrl]) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${user.token}`)
          .set('Content-Type', 'application/json');
        return this.http.patch(`${baseUrl}/Card/${cardId}`, card, { headers });
      })
    );
  }

  createCard(card: { QuizText: string; Answer: string; Image: string }, uri: string) {
    return combineLatest([this.user$, this.baseUrl$]).pipe(
      filter(([user, baseUrl]) => user !== null && baseUrl !== undefined && baseUrl !== null),
      switchMap(([user, baseUrl]) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${user.token}`)
          .set('Content-Type', 'application/json');
        return this.http.post(`${baseUrl}${uri}`, card, { headers });
      })
    );
  }

  removeCard(cardId: string, deckId: string) {
    return combineLatest([this.user$, this.baseUrl$]).pipe(
      filter(([user, baseUrl]) => user !== null && baseUrl !== undefined && baseUrl !== null),
      switchMap(([user, baseUrl]) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${user.token}`)
          .set('Content-Type', 'application/json');
        return this.http.delete(`${baseUrl}/Deck/deck/${deckId}/card/${cardId}`, { headers });
      })
    );
  }

  deleteDeck(deckId: string, deleteType: string) {
    return combineLatest([this.user$, this.baseUrl$]).pipe(
      filter(([user, baseUrl]) => user !== null && baseUrl !== undefined && baseUrl !== null),
      switchMap(([user, baseUrl]) => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${user.token}`)
          .set('Content-Type', 'application/json');
        return this.http.delete(`${baseUrl}/Deck/${deckId}?type=${deleteType}`, { headers });
      })
    );
  }
  
}
