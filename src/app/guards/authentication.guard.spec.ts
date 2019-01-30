import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthenticationGuard } from './authentication.guard';
import { GithubService } from '../services/github.service';
import { ToastrService } from 'ngx-toastr';

describe('AuthenticationGuard', () => {
  const githubSpy = jasmine.createSpyObj('GithubService', ['isUserLoggedIn']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);

  let guard: AuthenticationGuard;

  let githubServiceMock: jasmine.SpyObj<GithubService>;
  let routerMock: jasmine.SpyObj<Router>;
  let toastrMock: jasmine.SpyObj<ToastrService>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: GithubService, useValue: githubSpy},
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    });

    guard = TestBed.get(AuthenticationGuard);
    githubServiceMock = TestBed.get(GithubService);
    routerMock = TestBed.get(Router);
    toastrMock = TestBed.get(ToastrService);

  });

  it('should be instantiated', () => {
    expect(guard).toBeTruthy();
  });

  it('should be able to activate route', () => {
    githubServiceMock.isUserLoggedIn.and.returnValue(true);
    const canActivate = guard.canActivate(null, null);

    expect(canActivate).toBeTruthy();
  });

  it('should not be able to activate route', () => {
    githubServiceMock.isUserLoggedIn.and.returnValue(false);
    const canActivate = guard.canActivate(null, null);

    expect(canActivate).toBeFalsy();
    expect(toastrMock.error).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalled();
  });
});
