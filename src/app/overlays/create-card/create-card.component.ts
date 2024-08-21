import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError, map, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeckService } from 'src/app/services/deck/deck.service';
import * as fromAuth from 'src/app/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { selectMyDecks } from 'src/app/auth/auth.reducer';
import Deck from 'src/app/models/Deck';
import { setMyDecks } from 'src/app/auth/auth.actions';
import Card from 'src/app/models/Card';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent {
  @Input() uri!: string;
  @Input() deckId!: string;

  isVisible = false;
  quizText = '';
  answer = '';
  imageBase64 = '';
  message = '';
  isError = false;

  @Output() overlayCreateCardClosed = new EventEmitter<void>();

  constructor(
    private deckService: DeckService,
    private store: Store<fromAuth.AuthState>
  ) {}

  openOverlay() {
    this.isVisible = true;
  }

  closeOverlay() {
    this.isVisible = false;
    this.overlayCreateCardClosed.emit();
    this.clearForm();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.remove('dragover');
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add('dragover');
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  createCard() {
    this.quizText = this.quizText.trim();
    this.answer = this.answer.trim();
  
    if (!this.quizText || this.quizText.length === 0) {
      this.displayMessage('Quiz text cannot be empty.', true);
      return;
    }
    if (this.quizText.length > 500) {
      this.displayMessage('Quiz text cannot exceed 500 characters.', true);
      return;
    }
    if (!this.answer || this.answer.length === 0) {
      this.displayMessage('Answer cannot be empty.', true);
      return;
    }
    if (this.answer.length > 700) {
      this.displayMessage('Answer cannot exceed 700 characters.', true);
      return;
    }
  
    const card = {
      QuizText: this.quizText,
      Answer: this.answer,
      Image: this.imageBase64
    };
  
    this.deckService.createCard(card, this.uri)
      .pipe(
        catchError(err => {
          let errorMessage = 'Failed to create card. ';
          console.log(err);
  
          if (err.error && err.error.errors) {
            const errors = err.error.errors;
  
            if (errors.status) {
              errorMessage += `HTTP Code ${errors.status}: `;
            }
  
            Object.keys(errors).forEach(key => {
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
          this.displayMessage('Card created successfully!', false);
          this.store.select(selectMyDecks).pipe(
            take(1),
            map((existingDecks: Deck[]) => {
              // Find the deck where the card needs to be added
              const deckToUpdate = existingDecks.find(deck => deck.deckId === this.deckId);
      
              if (deckToUpdate) {
                // Add the new card to the deck's cards array
                const updatedDeck = {
                  ...deckToUpdate,
                  cards: [...deckToUpdate.cards, response as Card]
                };
      
                // Replace the old deck with the updated deck in the array
                const updatedDecks = existingDecks.map(deck =>
                  deck.deckId === this.deckId ? updatedDeck : deck
                );
      
                return updatedDecks;
              } else {
                return existingDecks;
              }
            }),
            tap((updatedDecks: Deck[]) => {
              this.store.dispatch(setMyDecks({ decks: updatedDecks }));
            })
          ).subscribe();  // <-- This subscribe() ensures the observable chain completes
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
    this.quizText = '';
    this.answer = '';
    this.imageBase64 = '';
  }
}
