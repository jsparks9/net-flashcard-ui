import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, of } from 'rxjs';
import { DeckService } from 'src/app/services/deck/deck.service';

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

  constructor(private deckService: DeckService) {}

  openOverlay() {
    this.isVisible = true;
  }

  closeOverlay() {
    this.isVisible = false;
    this.overlayClosed.emit();
    this.clearForm();
  }

  createDeck() {
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