import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { LoginSignupComponent } from './login-signup/login-signup.component';
import { GyanmatrixService } from './services/gyanmatrix.service';
import { DataService } from './services/data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/authguard.service';
import { PaginationComponent } from './pagination/pagination.component';
import { PlayersListComponent } from './players-list/players-list.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent ,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '', component: LoginSignupComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginSignupComponent,
    DashboardComponent,
    PaginationComponent,
    PlayersListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    GyanmatrixService,
    DataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
