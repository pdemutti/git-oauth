import { TestBed, inject } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Repository } from '../models/repository.interface';

describe('GithubService', () => {
  let githubService: GithubService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GithubService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    githubService = TestBed.get(GithubService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Component should be created', inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));

  it('Service should call getGithubLoginUrl fuction', () => {
    const url = 'http://api.com';
    const expectedData = { url };

    githubService.getGithubLoginUrl().subscribe(data => {
      expect(data).toEqual(url);
    });

    const req = httpTestingController.expectOne('api/login_url');
    req.flush(expectedData);
  });

  it('Service should call getToken function', () => {
    const code = 'someCode';
    const access_token = 'tokenFromServeer';
    const expectedData = { access_token };

    const tokenSub = githubService.getTokenEventEmitter();

    tokenSub.subscribe((token) => {
      expect(token).toEqual(access_token);
    });

    githubService.getToken(code).subscribe(() => {});

    const req = httpTestingController.expectOne(`api/access_token/${code}`);
    req.flush(expectedData);
  });

  it('Service should call getRepositories function', () => {
    const code = 'someCode';
    const access_token = 'tokenFromServeer';
    const expectedToken = { access_token };
    const repo = {
      id: 1233,
      name: 'Name',
      description: 'Description',
      private: false,
      html_url: 'http://xpto.com',
      stargazers_count: 2,
      watchers_count: 1,
      language: 'Java',
      forks: 0,
      fork: false,
      owner: {
        login: 'login',
        avatar_url: 'http://avatarxpto.com',
        html_url: 'https://htmlurlxpto.com'
      }
    };

    const repositories = [repo];

    githubService.getToken(code).subscribe(() => {});

    const reqAccess = httpTestingController.expectOne(`api/access_token/${code}`);
    reqAccess.flush(expectedToken);

    githubService.getRepositories().subscribe((repos: Repository[]) => {
      expect(repos.length).toEqual(1);
      expect(repos[0].id).toEqual(repo.id);
    });

    const reqRepo = httpTestingController.expectOne('api/user/repos');
    expect(reqRepo.request.headers.has('Authorization')).toBeTruthy();

    reqRepo.flush(repositories);
  });

  it('Service should call isUserLoggedIn function', () => {
    const code = 'someCode';
    const access_token = 'tokenFromServeer';
    const expectedData = { access_token };

    const tokenSub = githubService.getTokenEventEmitter();

    tokenSub.subscribe((token) => {
      expect(token).toEqual(access_token);
    });

    githubService.getToken(code).subscribe(() => {});

    const req = httpTestingController.expectOne(`api/access_token/${code}`);
    req.flush(expectedData);

    const isLoggedIn = githubService.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });
});
