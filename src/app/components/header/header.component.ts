import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isLoggedIn: boolean;

  constructor(
    private githubService: GithubService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.githubService.isUserLoggedIn();
    const observer = this.githubService.getTokenEventEmitter();
    this.subscription = observer.subscribe(this.onTokenChanged.bind(this));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.githubService.logout();
    this.toastr.success('Logged out');
    this.router.navigate(['/']);
  }

  private onTokenChanged(token: string) {
    this.isLoggedIn = !!token;
  }
}
