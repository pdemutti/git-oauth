import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Repository } from '../models/repository.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private token: string;
  private tokenSubscription = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
    const info = window.localStorage.getItem('token');
    const infoParsed = JSON.parse(info);
    this.token = infoParsed && infoParsed.access_token;
    this.tokenSubscription.next(this.token);
  }

  getGithubLoginUrl(): Observable<string> {
    const url = 'api/login_url';
    return this.http.get(url).pipe(
      map((data: any) => data.url)
    );
  }

  getToken(code: string) {
    const url = `api/access_token/${code}`;
    return this.http.get(url).pipe(
      tap(this.saveToken.bind(this))
    );
  }

  getRepositories() {
    const options = {
      headers: {
        'Authorization': `token ${this.token}`
      }
    };
    return this.http.get('api/user/repos', options).pipe(
      map(this.mapRepos.bind(this))
    );
  }

  isUserLoggedIn() {
    return !!this.token;
  }

  logout() {
    window.localStorage.clear();
    this.token = null;
    this.tokenSubscription.next(null);
  }

  getTokenEventEmitter(): Observable<string> {
    return this.tokenSubscription.asObservable();
  }

  private mapRepos(data): Repository[] {
    return data.map((repository) => {
      return {
        id: repository.id,
        name: repository.name,
        ownerPicture: repository.owner.avatar_url,
        description: repository.description,
        private: repository.private,
        forks: repository.forks,
        isFork: repository.fork,
        url: repository.html_url,
        stargazers: repository.stargazers_count,
        watchers: repository.watchers_count,
        language: repository.language,
        ownerName: repository.owner.login,
        ownerUrl: repository.owner.html_url
      } as Repository;
    });
  }

  private saveToken(tokenInfo) {
    this.token = tokenInfo.access_token;
    const jsonString = JSON.stringify(tokenInfo);
    window.localStorage.setItem('token', jsonString);
    this.tokenSubscription.next(this.token);
  }
}
