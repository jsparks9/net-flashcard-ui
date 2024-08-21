import { Component, Input } from '@angular/core';
import Deck from '../models/Deck';

@Component({
  selector: 'app-deck-box',
  templateUrl: './deck-box.component.html',
  styleUrls: ['./deck-box.component.css']
})
export class DeckBoxComponent {
  @Input() deck: Deck = {
    deckId: "",
    user: "",
    deckName: "",
    description: "",
    createdAt: new Date(),
    cards: []
  };

  showOverlay = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  handleCloseOverlay() {
    this.showOverlay = false;
  }
}
