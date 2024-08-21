import {Component, OnInit} from '@angular/core';
import * as fromAuth from "../auth/auth.reducer";
import {Store} from "@ngrx/store";
import Deck from '../models/Deck';
import { DeckService } from '../services/deck/deck.service';
import { setMyDecks } from '../auth/auth.actions';

@Component({
  selector: 'app-mydecks',
  templateUrl: './mydecks.component.html',
  styleUrls: ['./mydecks.component.css']
})
export class MydecksComponent implements OnInit {
  private initialized = false;
  user$ = this.store.select(fromAuth.selectUser);
  mydecks$ = this.store.select(fromAuth.selectMyDecks);
  
  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>,
  ) { }

  ngOnInit(): void {
    this.mydecks$.subscribe(decks => {
      if (!this.initialized && decks != null && decks.length === 0) {
        this.initialized = true;
        this.fetchMyDecks();
      }
    });
  }

  fetchMyDecks(): void {
    this.deckService.getMyDecks().subscribe((decks: Deck[]) => {
      this.store.dispatch(setMyDecks({ decks }));
    });
  }

}
