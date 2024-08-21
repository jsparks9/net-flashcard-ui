import { Component, EventEmitter, Output } from '@angular/core';
import { DeckService } from 'src/app/services/deck/deck.service';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent {
  isVisible = false;
  deckName = '';
  description = '';
  message = '';
  isError = false;

  @Output() overlayClosed = new EventEmitter<void>();

  constructor(private deckService: DeckService) {}

  openOverlay() {
    this.isVisible = true;
  }

  closeOverlay() {
    this.isVisible = false;
    this.overlayClosed.emit();
    this.clearForm();
  }

  createDeck() {}

  private displayMessage(msg: string, isError: boolean) {
    this.message = msg;
    this.isError = isError;
    setTimeout(() => {
      this.message = '';
      this.closeOverlay();
    }, 3000); // Message disappears after 3 seconds
  }

  private clearForm() {
    this.deckName = '';
    this.description = '';
  }
}