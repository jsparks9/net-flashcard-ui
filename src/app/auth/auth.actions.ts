import { createAction, props } from '@ngrx/store';
import UserInfo from '../models/UserInfo';


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
