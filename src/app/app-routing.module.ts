import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RouterGuardService} from "./services/router-guard.service";
import { CreateComponent } from './create/create.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { LoginComponent } from './login/login.component';
import { MydecksComponent } from './mydecks/mydecks.component';

const routes: Routes = [

  { path: "", component: HomeComponent},
  { path: 'create', component: CreateComponent, canActivate: [RouterGuardService]},
  { path: 'mydecks', component: MydecksComponent, canActivate: [RouterGuardService]},
  { path: 'help', component: HelpPageComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
