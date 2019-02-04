import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GithubService } from '../services/github.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private githubService: GithubService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isLoggedIn = this.githubService.isUserLoggedIn();
      if (isLoggedIn) {
        return true;
      }
      this.toastr.error('Informação de login faltante');
      this.router.navigate(['/']);
      return false;
  }
}
