import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/common/app/app.component';
import { HomeComponent } from '../app/components/feature/home/home.component';
import { LoginComponent } from '../app/components/feature/login/login.component';
import { CallbackComponent } from '../app/components/feature/callback/callback.component';

import { HeaderComponent } from './components/common/header/header.component';
import { RepositoryComponent } from './components/common/repository/repository.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CallbackComponent,
    HeaderComponent,
    RepositoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
