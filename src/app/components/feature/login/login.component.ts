import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../../services/github.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private subscription: Subscription;
  githubUrl: string;

  constructor(
    private githubService: GithubService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const observer = this.githubService.getGithubLoginUrl();
    this.subscription = observer.subscribe(
      (url) => this.githubUrl = url,
      (err) => this.onError(err)
    );
  }

  onError(err) {
    this.toastr.error('Error ao comunicar com o servidor');
    this.githubUrl = '';
  }

}
