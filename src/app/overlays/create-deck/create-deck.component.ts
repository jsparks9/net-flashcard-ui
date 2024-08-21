import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, map, of, take, tap } from 'rxjs';
import { DeckService } from 'src/app/services/deck/deck.service';
import * as fromAuth from 'src/app/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { selectMyDecks } from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { setMyDecks } from 'src/app/auth/auth.actions';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.css']
})
export class CreateDeckComponent {
  isVisible = false;
  deckName = '';
  description = '';
  message = '';
  isError = false;

  @Output() overlayClosed = new EventEmitter<void>();

  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>
  ) {}

  openOverlay() {
    this.isVisible = true;
  }

  closeOverlay() {
    this.isVisible = false;
    this.overlayClosed.emit();
    this.clearForm();
  }

  createDeck() {
    // Trim the input values
    this.deckName = this.deckName.trim();
    this.description = this.description.trim();

    // Basic validation
    if (!this.deckName || this.deckName.length === 0) {
        this.displayMessage('Deck name cannot be empty.', true);
        return;
    }
    if (this.deckName.length < 3) {
        this.displayMessage('Deck name must be at least 3 characters long.', true);
        return;
    }
    if (this.deckName.length > 50) {
        this.displayMessage('Deck name cannot exceed 50 characters.', true);
        return;
    }
    if (this.description.length > 200) {
        this.displayMessage('Description cannot exceed 200 characters.', true);
        return;
    }

    this.deckService.createDeck({ deckName: this.deckName, description: this.description, cards: [] })
      .pipe(
        catchError(err => {
          let errorMessage = 'Failed to create deck. ';
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
      .subscribe(response => {
        if (response) {
          this.displayMessage('Deck created successfully!', false);
      
          this.store.select(selectMyDecks).pipe(
            take(1),
            map((existingDecks: Deck[]) => [...existingDecks, response as Deck]),
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
      !isError && this.closeOverlay();
    }, 3000); // Message disappears after 3 seconds
  }

  private clearForm() {
    this.deckName = '';
    this.description = '';
  }
}