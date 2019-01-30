import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/feature/home/home.component';

import { HomeResolverService } from '../app/services/home-resolver.service';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
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
