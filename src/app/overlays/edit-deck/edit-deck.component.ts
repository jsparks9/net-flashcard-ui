import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import Deck from 'src/app/models/Deck';
import { CreateCardComponent } from '../create-card/create-card.component';
import { PatchDeckComponent } from '../patch-deck/patch-deck.component';
import { RemoveCardComponent } from '../remove-card/remove-card.component';
import Card from 'src/app/models/Card';
import { DeleteDeckComponent } from '../delete-deck/delete-deck.component';
import { PatchCardComponent } from '../patch-card/patch-card.component';

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
  @ViewChild('patchCardOverlay') patchCardOverlay: PatchCardComponent | undefined;
  @ViewChild('deleteDeckOverlay') deleteDeckOverlay: DeleteDeckComponent | undefined;

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
    this.deleteDeckOverlay?.openOverlay();
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

  patchCard(card: any, q: string, a: string, id: string) {
    this.patchCardOverlay?.openOverlay(card, q, a, id);
  }

  removeCard(card: Card) {
    this.removeCardOverlay?.openOverlay(card);
  }

  handleCreateOverlayClosed() {}
  handleEditDeckOverlayClosed() {}
  handleRemoveCardOverlayClosed() {}
  handleDeleteDeckOverlayClosed() {}
  handlePatchCardoverlayClosed() {}

}
