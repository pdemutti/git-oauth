import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { cold, getTestScheduler } from 'jasmine-marbles';
import { ToastrService } from 'ngx-toastr';

import { GithubService } from 'src/app/services/github.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const githubSpy = jasmine.createSpyObj('GithubService', ['isUserLoggedIn', 'getTokenEventEmitter', 'logout']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let githubServiceMock: jasmine.SpyObj<GithubService>;
  let routerMock: jasmine.SpyObj<Router>;
  let toastrMock: jasmine.SpyObj<ToastrService>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        { provide: GithubService, useValue: githubSpy},
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    githubServiceMock = TestBed.get(GithubService);
    routerMock = TestBed.get(Router);
    toastrMock = TestBed.get(ToastrService);
  });

  it('should be instantiated', () => {
    expect(component).toBeTruthy();
  });

  it('should recognize logged in user', () => {
    const $q = cold('----x|', {x: true});

    githubServiceMock.getTokenEventEmitter.and.returnValue($q);
    githubServiceMock.isUserLoggedIn.and.returnValue(true);

    fixture.detectChanges();

    expect(component.isLoggedIn).toBeTruthy();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toContain('Logout');
  });

  it('should recognize logged in user after new token emition', () => {
    const $q = cold('----x|', {x: 'asdf'});

    githubServiceMock.getTokenEventEmitter.and.returnValue($q);
    githubServiceMock.isUserLoggedIn.and.returnValue(false);

    fixture.detectChanges();

    expect(component.isLoggedIn).toBeFalsy();

    getTestScheduler().flush();

    expect(component.isLoggedIn).toBeTruthy();
  });

  it('should recognize logged out user after new token emition', () => {
    const $q = cold('----x|', {x: ''});

    githubServiceMock.getTokenEventEmitter.and.returnValue($q);
    githubServiceMock.isUserLoggedIn.and.returnValue(true);

    fixture.detectChanges();

    expect(component.isLoggedIn).toBeTruthy();

    getTestScheduler().flush();

    expect(component.isLoggedIn).toBeFalsy();
  });

  it('should logout user and redirect to login', () => {
    const $q = cold('----x|', {x: ''});

    githubServiceMock.getTokenEventEmitter.and.returnValue($q);
    githubServiceMock.isUserLoggedIn.and.returnValue(true);

    fixture.detectChanges();

    expect(component.isLoggedIn).toBeTruthy();

    component.logout();

    expect(githubServiceMock.logout).toHaveBeenCalled();
    expect(toastrMock.success).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
