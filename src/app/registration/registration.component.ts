import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/auth.reducer';
import { registerRequest } from '../auth/auth.actions';
import * as fromAuth from "../auth/auth.reducer";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error$ = this.store.select(fromAuth.selectExploreDecks);

  constructor(
    private store: Store<AuthState>
  ) { }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      return;
    }
    
    const creds = {
      username: this.username,
      fullName: this.fullName,
      email: this.email,
      password: this.password
    };
    this.store.dispatch(registerRequest({ creds }));
  }

  isFormValid(): boolean {
    return this.username.trim() !== '' && this.email.trim() !== '' && this.password.trim() !== '' && this.password === this.confirmPassword;
  }
}

