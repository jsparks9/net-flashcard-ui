import { Component, Output, EventEmitter, Input } from '@angular/core';
import Deck from 'src/app/models/Deck';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent {
  deckName = '';
  description = '';
  message = '';
  isError = false;
  @Input() deck!: Deck;
  @Output() closeOverlay = new EventEmitter<void>();

  saveDeck() {
    throw new Error('Method not implemented.');
  }

  close() {
    this.closeOverlay.emit();
  }

  toggleView() {
    console.log("Toggle View");
    // Implement the logic to toggle between card and table view
  }

  addFlashCard() {
    console.log("Add Flash Card");
    // Implement the logic to add a new flash card
  }

  editCard(card: any) {
    console.log("Edit Card", card);
    // Implement the logic to edit the selected card
  }

  deleteCard(card: any) {
    console.log("Delete Card", card);
    // Implement the logic to delete the selected card
  }

}
