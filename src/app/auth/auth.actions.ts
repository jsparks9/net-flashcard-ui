import { createAction, props } from '@ngrx/store';
import UserInfo from '../models/UserInfo';
import Deck from '../models/Deck';


export const registerRequest = createAction(
  '[Auth] Register Request',
  props<{ creds: {username: string; password: string; email: string; fullName: string}}>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ registerSuccessResp: UserInfo }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ registerFailureResp: any }>()
);

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ creds: {username: string; password: string}}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Request Success',
  props<{ loginSuccessResp: UserInfo}>()
);

export const loginFailure = createAction(
  '[Auth] Login Request Failure',
  props<{ loginFailureResp: string}>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const setDecks = createAction(
  '[Auth] Set Decks',
  props<{ decks: Deck[] }>()
);

export const setMyDecks = createAction(
  '[Auth] Set My Decks',
  props<{ decks: Deck[] }>()
);
