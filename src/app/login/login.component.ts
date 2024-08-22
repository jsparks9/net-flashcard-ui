import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/auth.reducer';
import { loginRequest } from '../auth/auth.actions';
import * as fromAuth from "../auth/auth.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error$ = this.store.select(fromAuth.selectExploreDecks);

  constructor(
    private store: Store<AuthState>
  ) { }

  onSubmit() {
    const creds = {
      username: this.username,
      password: this.password
    };
    this.store.dispatch(loginRequest({ creds }));
  }

  isFormValid(): boolean {
    return this.username.trim() !== '' && this.password.trim() !== '';
  }
}
