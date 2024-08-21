import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { authReducer } from './auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';
import {MatDialogModule} from "@angular/material/dialog";
import { DatePipe } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CreateComponent } from './create/create.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { LoginComponent } from './login/login.component';
import { DeckBoxComponent } from './deck-box/deck-box.component';
import { TruncatePipe } from './utils/pipes/truncate';
import { MydecksComponent } from './mydecks/mydecks.component';
import { QuizComponent } from './overlays/quiz/quiz.component';
import { CreateDeckComponent } from './overlays/create-deck/create-deck.component';
import { CreateCardComponent } from './overlays/create-card/create-card.component';
import { EditDeckComponent } from './overlays/edit-deck/edit-deck.component';
import { PatchDeckComponent } from './overlays/patch-deck/patch-deck.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreateComponent,
    HelpPageComponent,
    LoginComponent,
    DeckBoxComponent,
    TruncatePipe,
    MydecksComponent,
    QuizComponent,
    CreateDeckComponent,
    CreateCardComponent,
    EditDeckComponent,
    PatchDeckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
