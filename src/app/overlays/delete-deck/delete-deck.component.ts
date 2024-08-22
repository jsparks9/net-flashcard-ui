import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as fromAuth from 'src/app/auth/auth.reducer';
import { DeckService } from 'src/app/services/deck/deck.service';
import { Store } from '@ngrx/store';
import { catchError, map, of, take, tap } from 'rxjs';
import { selectMyDecks } from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { setMyDecks } from 'src/app/auth/auth.actions';

@Component({
  selector: 'app-delete-deck',
  templateUrl: './delete-deck.component.html',
  styleUrls: ['./delete-deck.component.css']
})
export class DeleteDeckComponent {
  isVisible = false;
  message = '';
  isError = false;
  @Input() deck!: Deck;
  @Input() deleteType!: string;

  @Output() deleteDeckoverlayClosed = new EventEmitter<void>();

  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>
  ) {}

  openOverlay() {
    this.isVisible = true;
  }

  confirmRemove() {
    if (!this.deck) {
      this.displayMessage("Unknown Error", true);
      return; 
    }

    this.deckService.deleteDeck(this.deck.deckId, this.deleteType)
      .pipe(
        catchError(err => {
          let errorMessage = 'Failed to delete deck. ';
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
          this.displayMessage('Deck deleted successfully!', false);
      
          this.store.select(selectMyDecks).pipe(
            take(1),
            map((existingDecks: Deck[]) => 
              existingDecks.filter(d => d.deckId !== this.deck?.deckId)
            ),
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
      !isError && this.closeRemoveDeleteDeckOverlay();
    }, 3000); // Message disappears after 3 seconds
  }

  closeRemoveDeleteDeckOverlay() {
    this.isVisible = false;
    this.deleteDeckoverlayClosed.emit();
  }
}
