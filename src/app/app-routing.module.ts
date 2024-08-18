import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RouterGuardService} from "./services/router-guard.service";

const routes: Routes = [

  { path: "", component: HomeComponent, canActivate: [RouterGuardService]},
  { path: 'login', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
