import { Component, EventEmitter, Input, Output } from '@angular/core';
import Deck from 'src/app/models/Deck';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @Input() deck!: Deck;
  @Output() closeOverlay = new EventEmitter<void>();

  currentCardIndex: number = 0;
  showAnswer: boolean = false;

  get currentCard() {
    return this.deck.cards[this.currentCardIndex];
  }

  cyclePrevCard() {
    if (this.deck.cards.length > 1) {
      this.showAnswer = false; 
      this.currentCardIndex = (this.currentCardIndex + this.deck.cards.length - 1 ) % this.deck.cards.length;
    }
  }

  cycleNextCard() {
    if (this.deck.cards.length > 1) {
      this.showAnswer = false;
      this.currentCardIndex = (this.currentCardIndex + 1) % this.deck.cards.length;
    }
    
  }

  randomizeCards() {
    if (this.deck.cards.length > 1) {
      this.showAnswer = false; 
      let newIndex;
      do {
          newIndex = Math.floor(Math.random() * this.deck.cards.length);
      } while (newIndex === this.currentCardIndex);

      this.currentCardIndex = newIndex;
    }
}


  showAnswerToggle() {
    this.showAnswer = !this.showAnswer;
  }

  saveChanges() {
    // Logic to save the changes
    this.closeOverlay.emit();
  }

  close() {
    this.closeOverlay.emit();
  }
}