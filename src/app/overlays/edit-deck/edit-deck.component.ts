import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import Deck from 'src/app/models/Deck';
import { CreateCardComponent } from '../create-card/create-card.component';
import { PatchDeckComponent } from '../patch-deck/patch-deck.component';
import { RemoveCardComponent } from '../remove-card/remove-card.component';
import Card from 'src/app/models/Card';

export interface ExpandedCard extends Card {
  isAnswerVisible: boolean;
}

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit {
  isTableView: boolean = true;
  message = '';
  isError = false;
  cards!: ExpandedCard[];
  @Input() deck!: Deck;
  @Output() closeOverlay = new EventEmitter<void>();
  @ViewChild('createCardOverlay') createCardOverlay: CreateCardComponent | undefined;
  @ViewChild('editDeckOverlay') editDeckOverlay: PatchDeckComponent | undefined;
  @ViewChild('removeCardOverlay') removeCardOverlay: RemoveCardComponent | undefined;

  ngOnInit() {
    this.cards = this.deck.cards.map(card => ({
      ...card, isAnswerVisible: false 
    })) as ExpandedCard[];
  }

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
    this.isTableView = !this.isTableView;
  }

  showCreateCardOverlay() {
    this.createCardOverlay?.openOverlay();
  }

  editCard(card: any) {
    console.log("Edit Card", card);
    // Implement the logic to edit the selected card
  }

  removeCard(card: Card) {
    this.removeCardOverlay?.openOverlay(card);
  }

  handleCreateOverlayClosed() {}
  handleEditDeckoverlayClosed() {}
  handleRemoveCardoverlayClosed() {}

}
