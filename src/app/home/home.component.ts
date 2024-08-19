import {Component, OnInit} from '@angular/core';
import * as fromAuth from "../auth/auth.reducer";
import {Store} from "@ngrx/store";
import Deck from '../models/Deck';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin$ = this.store.select(fromAuth.selectIsAdmin);
  user$ = this.store.select(fromAuth.selectUser);
  decks: Deck[] = [
    {
      deckId: 'deck1',
      deckName: 'Math Fundamentals',
      description: 'Basic concepts in mathematics.',
      userId: 'user1',
      cards: [
        {
          card_id: 'card1',
          quiz_text: 'What is 2+2?',
          answers: ['3', '4', '5', '6'],
        },
        {
          card_id: 'card2',
          quiz_text: 'Solve for x: 3x + 2 = 11',
          answers: ['x = 2', 'x = 3', 'x = 1', 'x = 4'],
        },
        {
          card_id: 'card3',
          quiz_text: 'What is the square root of 16?',
          answers: ['2', '4', '6', '8'],
        },
      ],
    },
    {
      deckId: 'deck2',
      deckName: 'History Facts',
      description: 'Important events in world history.',
      userId: 'user2',
      cards: [
        {
          card_id: 'card4',
          quiz_text: 'Who was the first President of the United States?',
          answers: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Abraham Lincoln'],
        },
        {
          card_id: 'card5',
          quiz_text: 'In which year did World War II end?',
          answers: ['1942', '1945', '1948', '1950'],
        },
        {
          card_id: 'card6',
          quiz_text: 'Which civilization built the pyramids?',
          answers: ['Romans', 'Greeks', 'Egyptians', 'Aztecs'],
        },
      ],
    },
    {
      deckId: 'deck3',
      deckName: 'Science Trivia',
      description: 'Interesting facts about science.',
      userId: 'user3',
      cards: [
        {
          card_id: 'card7',
          quiz_text: 'What is the chemical symbol for water?',
          answers: ['H2O', 'O2', 'CO2', 'NaCl'],
        },
        {
          card_id: 'card8',
          quiz_text: 'What planet is known as the Red Planet?',
          answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        },
        {
          card_id: 'card9',
          quiz_text: 'What is the speed of light?',
          answers: ['299,792 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s'],
        },
      ],
    },
  ];

  constructor(
    private store: Store<fromAuth.AuthState>,
  ) { }

  ngOnInit(): void {}


}
