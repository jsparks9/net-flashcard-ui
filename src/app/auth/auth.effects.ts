import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { loginFailure, loginRequest, loginSuccess } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(() => this.actions$.pipe(
    ofType(loginRequest),
    switchMap((action) =>
      this.authService
        .login(action.creds.username, action.creds.password)
        .pipe(
          map((loginSuccessResp) =>
            loginSuccess({ loginSuccessResp })
          ),
          catchError((error) => of(loginFailure({ loginFailureResp: error })))
        )
    )
  ));

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigateByUrl('/mydecks');
        })
      ),
    { dispatch: false }
  );
  

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
