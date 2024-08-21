import { Component, ViewChild } from '@angular/core';
import { CreateDeckComponent } from '../overlays/create-deck/create-deck.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @ViewChild('deckOverlay') deckOverlay: CreateDeckComponent | undefined;

  showOverlay() {
    this.deckOverlay?.openOverlay();
  }

  handleOverlayClosed() {
    console.log('Overlay closed');
    // Handle any actions after the overlay is closed
  }
}
