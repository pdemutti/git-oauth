import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GithubService } from './github.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<any> {

  constructor(
    private githubService: GithubService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.githubService.getRepositories().pipe(
      take(1)
    );
  }
}
