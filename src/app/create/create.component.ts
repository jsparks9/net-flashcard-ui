import { Component, ViewChild } from '@angular/core';
import { CreateDeckComponent } from '../overlays/create-deck/create-deck.component';
import { CreateCardComponent } from '../overlays/create-card/create-card.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @ViewChild('deckOverlay') deckOverlay: CreateDeckComponent | undefined;
  @ViewChild('cardOverlay') cardOverlay: CreateCardComponent | undefined;

  showDeckOverlay() {
    this.deckOverlay?.openOverlay();
  }

  showCardOverlay() {
    this.cardOverlay?.openOverlay();
  }

  handleOverlayClosed() {
    console.log('Overlay closed');
    // Handle any actions after the overlay is closed
  }
}
