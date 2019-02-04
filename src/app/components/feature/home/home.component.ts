import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Repository } from '../../../models/repository.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  repos: Repository[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe((data) => {
      this.repos = data.repos;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
