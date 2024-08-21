import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, map, of, take, tap } from 'rxjs';
import { DeckService } from 'src/app/services/deck/deck.service';
import * as fromAuth from 'src/app/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { selectMyDecks } from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { setMyDecks } from 'src/app/auth/auth.actions';

@Component({
  selector: 'app-patch-deck',
  templateUrl: './patch-deck.component.html',
  styleUrls: ['./patch-deck.component.css']
})
export class PatchDeckComponent {
  @Input() deck!: Deck;

  isVisible = false;
  deckName = '';
  description = '';
  message = '';
  isError = false;

  @Output() editDeckoverlayClosed = new EventEmitter<void>();

  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>
  ) {}

  openOverlay() {
    this.isVisible = true;
  }

  closePatchDeckOverlay() {
    this.isVisible = false;
    this.editDeckoverlayClosed.emit();
    this.clearForm();
  }

  patchDeck() {
    // Trim the input values
    this.deckName = this.deckName.trim();
    this.description = this.description.trim();

    if (!this.deckName && !this.description) {
      this.displayMessage('Either deck name or description must be provided.', true);
      return;
    }
    if (this.deckName) {
      if (this.deckName.length < 3) {
          this.displayMessage('Deck name must be at least 3 characters long.', true);
          return;
      }
      if (this.deckName.length > 50) {
          this.displayMessage('Deck name cannot exceed 50 characters.', true);
          return;
      }
    }

    // Validate description if provided
    if (this.description && this.description.length > 200) {
        this.displayMessage('Description cannot exceed 200 characters.', true);
        return;
    }

    this.deckService.patchDeck({ deckName: this.deckName, description: this.description}, this.deck.deckId)
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
          this.displayMessage('Deck created successfully!', false);
      
          this.store.select(selectMyDecks).pipe(
            take(1),
            map((existingDecks: Deck[]) => {
              // Patch this.deck with the new values if they are non-empty
              const patchedDeck = {
                ...this.deck,
                deckName: this.deckName && this.deckName.trim() !== '' ? this.deckName : this.deck.deckName,
                description: this.description && this.description.trim() !== '' ? this.description : this.deck.description,
              };
              console.log(patchedDeck);
              
              // Replace the deck in the state
              return existingDecks.map(deck => {
                if (deck.deckId === this.deck.deckId) {
                  return patchedDeck; // Replace with patched deck
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
      !isError && this.closePatchDeckOverlay();
    }, 3000); // Message disappears after 3 seconds
  }

  private clearForm() {
    this.deckName = '';
    this.description = '';
  }
}