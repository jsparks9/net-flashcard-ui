import {Component, OnInit} from '@angular/core';
import * as fromAuth from "../auth/auth.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin$ = this.store.select(fromAuth.selectIsAdmin);
  user$ = this.store.select(fromAuth.selectUser);


  constructor(
    private store: Store<fromAuth.AuthState>,
  ) { }

  ngOnInit(): void {}


}
