import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth/auth.reducer'
import { logout } from '../auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedIn$ = this.store.select(fromAuth.selectLoggedIn);

  constructor(
    private store: Store<fromAuth.AuthState>,
  ) { }

  doLogout(): void {
    this.store.dispatch(logout());
  }

}
