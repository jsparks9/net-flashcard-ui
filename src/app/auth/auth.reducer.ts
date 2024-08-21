import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loginFailure, loginSuccess, logout, setDecks, setMyDecks } from './auth.actions';
import Deck from '../models/Deck';
import Card from '../models/Card';

const baseUrl = "https://localhost:7174/api"

export interface AuthState {
  baseUrl: string;
  decks: Deck[];
  myCards: Card[];
  myDecks: Deck[];
  loggedIn: boolean;
  user: any;
  error: any;
}

export const initialState: AuthState = {
  baseUrl: baseUrl,
  decks: [],
  myCards: [],
  myDecks: [],
  loggedIn: false,
  user: null,
  error: null
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginSuccessResp }) => {
    return {
      ...state,
      loggedIn: true,
      user: loginSuccessResp,
      error: null
    };
  }), 
  on(loginFailure, (state, { loginFailureResp }) => {
    return {
      ...state,
      loggedIn: false,
      user: null,
      myCards: [],
      mydecks: [],
      error: loginFailureResp,
    };
  }), 
  on(logout, state => {
    return {
      ...state,
      loggedIn: false,
      user: null,
      myCards: [],
      mydecks: [],
      error: null
    };
  }),
  on(setDecks, (state, { decks }) => {
    return {
      ...state,
      decks: decks
    }
  }),
  on(setMyDecks, (state, { decks }) => {
    return {
      ...state,
      myDecks: decks
    }
  }),

)

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectBaseUrl = createSelector(selectAuthState, s => s.baseUrl);

export const selectAllDecks = createSelector(selectAuthState, s => s.decks);

export const selectExploreDecks = createSelector(selectAuthState,
  s => {
    const username = s.user?.username;
    return s.decks.filter(deck => deck.user !== username && deck.cards.length>0);
  }
);

export const selectMyDecks = createSelector(selectAuthState, s => s.myDecks);

export const selectLoggedIn = createSelector(selectAuthState, s => s.loggedIn);

export const selectUser = createSelector( selectAuthState, s => s.user);

export const selectFirstLast = createSelector( selectAuthState, s => s.user.profile.firstName + ' ' + s.user.profile.lastName.charAt(0) + '.');

