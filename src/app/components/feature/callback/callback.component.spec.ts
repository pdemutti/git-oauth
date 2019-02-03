import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { CallbackComponent } from './callback.component';
import { GithubService } from 'src/app/services/github.service';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  let activatedRoute: ActivatedRouteStub;
  let githubServiceMock: jasmine.SpyObj<GithubService>;
  
  let routerMock: jasmine.SpyObj<Router>;
  let toastrMock: jasmine.SpyObj<ToastrService>;

  const githubSpy = jasmine.createSpyObj('GithubService', ['getToken']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        CallbackComponent
       ],
       providers: [
        { provide: GithubService, useValue: githubSpy},
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ToastrService, useValue: toastrSpy }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;

    githubServiceMock = TestBed.get(GithubService);

    routerMock = TestBed.get(Router);
    toastrMock = TestBed.get(ToastrService);
  });

  it('Component should be instantiated', () => {
    expect(component).toBeTruthy();
  });

  it('Component should receive data and redirect user', () => {
    activatedRoute.setParamMap({ code: 'asdfff' });

    const $j = cold('----x|', {x: {'token': 'fdafda'}});
    githubServiceMock.getToken.and.returnValue($j);

    fixture.detectChanges();
    getTestScheduler().flush();

    expect(githubServiceMock.getToken).toHaveBeenCalledWith('asdfff');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('Callback should not receive data and redirect user to login page', () => {
    fixture.detectChanges();

    activatedRoute.setParamMap({ code: null });
    expect(toastrMock.error).toHaveBeenCalled();

    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });

  it('Callback should receive data, get error as token and redirect user to login page', () => {
    activatedRoute.setParamMap({ code: 'asdfff' });
    fixture.detectChanges();

    const $j = cold('----x|', {x: {'token': new Error('Error')}});
    githubServiceMock.getToken.and.returnValue($j);
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(githubServiceMock.getToken).toHaveBeenCalledWith('asdfff');
    expect(toastrMock.error).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['login']);
  });
});
