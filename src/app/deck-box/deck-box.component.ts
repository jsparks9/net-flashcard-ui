import { Component, Input } from '@angular/core';
import Card from '../models/Card';

@Component({
  selector: 'app-deck-box',
  templateUrl: './deck-box.component.html',
  styleUrls: ['./deck-box.component.css']
})
export class DeckBoxComponent {
  @Input() deckId: string = "";
  @Input() numCards: number = 0;
  @Input() deckTitle: string = "";
  @Input() deckDesc: string = "";
  @Input() cards: Card[] = [];
}
