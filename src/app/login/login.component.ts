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
    const creds = {
      username: this.username,
      password: this.password
    };
    this.store.dispatch(loginRequest({ creds }));
  }
}
