import { Component, Input } from '@angular/core';
import Deck from '../models/Deck';
import * as fromAuth from 'src/app/auth/auth.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-deck-box',
  templateUrl: './deck-box.component.html',
  styleUrls: ['./deck-box.component.css']
})
export class DeckBoxComponent {
  user$ = this.store.select(fromAuth.selectUser);

  @Input() deck: Deck = {
    deckId: "",
    user: "",
    deckName: "",
    description: "",
    createdAt: new Date(),
    cards: []
  };

  constructor(
    private store: Store<fromAuth.AuthState>
  ) {}

  showOverlay = false;
  showEditDeckOverlay = false;

  toggleOverlay() {
    if (this.deck.cards.length > 0)
      this.showOverlay = !this.showOverlay;
  }

  editDeck(event: Event) {
    event.stopPropagation();
    this.showEditDeckOverlay = !this.showEditDeckOverlay;
  }

  handleCloseOverlay() {
    this.showOverlay = false;
  }

  handleEditDeckClose() {
    this.showEditDeckOverlay = false;
  }
}
