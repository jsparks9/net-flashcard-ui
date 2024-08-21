import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import Deck from 'src/app/models/Deck';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit{
  ngOnInit(): void {
    console.log("Init of Edit Deck");
  }
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

}
