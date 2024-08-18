import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth/auth.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private store: Store<fromAuth.AuthState>,
  ) { }

}
