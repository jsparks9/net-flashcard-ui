import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, map, of, take, tap } from 'rxjs';
import { DeckService } from 'src/app/services/deck/deck.service';
import * as fromAuth from 'src/app/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { selectMyDecks } from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { setMyDecks } from 'src/app/auth/auth.actions';
import Card from 'src/app/models/Card';

@Component({
  selector: 'app-patch-card',
  templateUrl: './patch-card.component.html',
  styleUrls: ['./patch-card.component.css']
})
export class PatchCardComponent {
  isVisible = false;
  message = '';
  isError = false;
  card: Card | null = null;
  question = '';
  answer = '';
  id = '';

  @Output() patchCardoverlayClosed = new EventEmitter<void>();

  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>
  ) {}

  openOverlay(card: Card, q: string, a: string, id: string) {
    this.card = card;
    this.question = q;
    this.answer = a;
    this.id = id;
    this.isVisible = true;
  }

  closePatchCardOverlay() {
    this.isVisible = false;
    this.patchCardoverlayClosed.emit();
    this.clearForm();
  }

  patchCard() {
    // Trim the input values
    this.question = this.question.trim();
    this.answer = this.answer.trim();

    if (!this.question && !this.answer) {
      this.displayMessage('Either question or answer must be provided.', true);
      return;
    }
    if (this.question == this.card?.quizText && this.answer == this.card.answer) {
      this.displayMessage('No changes were made to the card question or answer.', true);
      return;
    }

    if (this.question.length > 500) {
      this.displayMessage('Question cannot exceed 500 characters.', true);
      return;
    }

    // Validate description if provided
    if (this.answer && this.answer.length > 700) {
        this.displayMessage('Answer cannot exceed 700 characters.', true);
        return;
    }

    this.deckService.patchCard({ QuizText: this.question, Answer: this.answer, Image: ""}, this.id)
      .pipe(
        catchError(err => {
          let errorMessage = 'Failed to edit deck. ';
          console.log(err);
          
          if (err.error && err.error.errors) {
            const errors = err.error.errors;
            
            // Add the status if available
            if (err.error.status) {
              errorMessage += `HTTP Code ${err.error.status}: `;
            }
            
            // Iterate through all keys in the errors object
            Object.keys(errors).forEach(key => {
              // Skip 'title', 'traceId', and 'type'
              if (key !== 'title' && key !== 'traceId' && key !== 'type' && key !== 'status') {
                errorMessage += `${errors[key]}. `;
              }
            });
          } else if (err.message) {
            errorMessage += `Details: ${err.message}`;
          } else {
            errorMessage += 'Please try again later.';
          }

          this.displayMessage(errorMessage, true);
          return of(null); // Handle the error
        })
      )
      .subscribe({
        next: () => {
          this.displayMessage('Card edited successfully!', false);
      
          this.store.select(selectMyDecks).pipe(
            take(1),
            map((existingDecks: Deck[]) => {
                const q = this.question && this.question.trim().length > 0  && this.question !== this.card?.quizText ? this.question : this.card?.quizText;
                const a = this.answer && this.answer.trim().length > 0 && this.answer !== this.card?.answer ? this.answer : this.card?.answer;
                const patchedCard = {
                    ...this.card, 
                    quizText: q ? q : this.question,
                    answer: a ? a : this.answer,
                };
        
                // Go through each deck and check if it contains the card with the known id
                return existingDecks.map(deck => {
                    const cardIndex = deck.cards.findIndex(card => card.cardId === this.card?.cardId);
                    
                    if (cardIndex !== -1) {
                        // Create a new deck with the patched card replacing the old one
                        const patchedCards = [...deck.cards];
                        patchedCards[cardIndex] = patchedCard as Card;
        
                        return {
                            ...deck,
                            cards: patchedCards
                        };
                    }
                    return deck; // Return the deck unchanged if the card is not found
                });
            }),
            tap((updatedDecks: Deck[]) => this.store.dispatch(setMyDecks({ decks: updatedDecks })))
        ).subscribe();
          
        }
      });
  }
  

  private displayMessage(msg: string, isError: boolean) {
    this.message = msg;
    this.isError = isError;
    setTimeout(() => {
      this.message = '';
      !isError && this.closePatchCardOverlay();
    }, 3000); // Message disappears after 3 seconds
  }

  private clearForm() {
    this.question = '';
    this.answer = '';
  }
}