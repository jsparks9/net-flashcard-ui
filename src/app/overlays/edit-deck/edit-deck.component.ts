import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import Deck from 'src/app/models/Deck';
import { CreateCardComponent } from '../create-card/create-card.component';
import { PatchDeckComponent } from '../patch-deck/patch-deck.component';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent {
  message = '';
  isError = false;
  @Input() deck!: Deck;
  @Output() closeOverlay = new EventEmitter<void>();
  @ViewChild('createCardOverlay') createCardOverlay: CreateCardComponent | undefined;
  @ViewChild('editDeckOverlay') editDeckOverlay: PatchDeckComponent | undefined;

  saveDeck() {
    throw new Error('Method not implemented.');
  }

  editDeck() {
    this.editDeckOverlay?.openOverlay();
  }

  deleteDeck() {
    throw new Error('Method not implemented.');
  }

  close() {
    this.closeOverlay.emit();
  }

  toggleView() {
    console.log("Toggle View");
    // Implement the logic to toggle between card and table view
  }

  showCreateCardOverlay() {
    this.createCardOverlay?.openOverlay();
  }

  editCard(card: any) {
    console.log("Edit Card", card);
    // Implement the logic to edit the selected card
  }

  deleteCard(card: any) {
    console.log("Delete Card", card);
    // Implement the logic to delete the selected card
  }

  handleCreateOverlayClosed() {}
  handleEditDeckoverlayClosed() {}
}
