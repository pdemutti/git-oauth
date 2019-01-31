import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/feature/home/home.component';
import { LoginComponent } from '../app/components/feature/login/login.component';

import { HomeResolverService } from '../app/services/home-resolver.service';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [ AuthenticationGuard ], 
    resolve: { 
      repos: HomeResolverService 
    } 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
