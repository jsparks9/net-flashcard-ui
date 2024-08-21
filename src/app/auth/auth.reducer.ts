import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loginFailure, loginSuccess, logout } from './auth.actions';

const baseUrl = "https://localhost:7174/api"

export interface AuthState {
  baseUrl: string;
  loggedIn: boolean;
  user: any;
  error: any;
}

export const initialState: AuthState = {
  baseUrl: baseUrl,
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
      loggedIn: true,
      user: {id:1, profile:null, admin:true, active:true, status:""},
      error: loginFailureResp,
    };
  }), 
  on(logout, state => {
    return {
      ...state,
      loggedIn: false,
      user: null,
      error: null
    };
  }),

)

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}





export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectBaseUrl = createSelector(selectAuthState, s => s.baseUrl);

export const selectLoggedIn = createSelector(selectAuthState, s => s.loggedIn);

export const selectUser = createSelector( selectAuthState, s => s.user);

export const selectIsAdmin = createSelector( selectAuthState, s => s.user && s.user.admin);

export const selectFirstLast = createSelector( selectAuthState, s => s.user.profile.firstName + ' ' + s.user.profile.lastName.charAt(0) + '.');

export const selectUserId = createSelector( selectAuthState, s => s.user.id)

export const selectAdminTeamId = createSelector( selectAuthState, s => s.user.teams[0].id)
