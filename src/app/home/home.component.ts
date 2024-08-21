import {Component, OnInit} from '@angular/core';
import * as fromAuth from "../auth/auth.reducer";
import {Store} from "@ngrx/store";
import Deck from '../models/Deck';
import { DeckService } from '../services/deck/deck.service';
import { setDecks } from '../auth/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private initialized = false;
  user$ = this.store.select(fromAuth.selectUser);
  decks$ = this.store.select(fromAuth.selectExploreDecks);
  
  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>,
  ) { }

  ngOnInit(): void {
    this.decks$.subscribe(decks => {
      if (!this.initialized && decks != null && decks.length === 0) {
        this.initialized = true;
        this.fetchDecks();
      }
    });
  }

  fetchDecks(): void {
    this.deckService.getAllDecks().subscribe((decks: Deck[]) => {
      this.store.dispatch(setDecks({ decks }));
    });
  }

}
