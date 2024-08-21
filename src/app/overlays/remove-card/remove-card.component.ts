import { Component, EventEmitter, Input, Output } from '@angular/core';
import Card from 'src/app/models/Card';
import * as fromAuth from 'src/app/auth/auth.reducer';
import { DeckService } from 'src/app/services/deck/deck.service';
import { Store } from '@ngrx/store';
import { catchError, map, of, take, tap } from 'rxjs';
import { selectMyDecks } from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { setMyDecks } from 'src/app/auth/auth.actions';

@Component({
  selector: 'app-remove-card',
  templateUrl: './remove-card.component.html',
  styleUrls: ['./remove-card.component.css']
})
export class RemoveCardComponent {
  isVisible = false;
  message = '';
  isError = false;
  card: Card | null = null;
  @Input() deckId!: string;

  @Output() removeCardoverlayClosed = new EventEmitter<void>();

  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>
  ) {}

  openOverlay(card: Card) {
    this.card = card;
    this.isVisible = true;
  }

  confirmRemove() {
    if (!this.card || !this.card.cardId) {
      this.displayMessage("Unknown Error", true);
      return; 
    }

    this.deckService.removeCard(this.card.cardId, this.deckId)
      .pipe(
        catchError(err => {
          let errorMessage = 'Failed to remove card. ';
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
          this.displayMessage('Card removed successfully!', false);
      
          this.store.select(selectMyDecks).pipe(
            take(1),
            map((existingDecks: Deck[]) => {
              // Find and modify the deck
              return existingDecks.map(deck => {
                if (deck.deckId === this.deckId) {
                  // Remove the card by cardId
                  const updatedCards = deck.cards.filter(card => card.cardId !== this.card?.cardId);
                  return { ...deck, cards: updatedCards };
                }
                return deck;
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
      !isError && this.closeRemoveCardOverlay();
    }, 3000); // Message disappears after 3 seconds
  }

  closeRemoveCardOverlay() {
    this.isVisible = false;
    this.removeCardoverlayClosed.emit();
  }
}
