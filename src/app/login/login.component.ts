import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/auth.reducer';
import { loginRequest } from '../auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private store: Store<AuthState>
  ) { }

  onSubmit() {
    console.log("Submit button clicked");
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
