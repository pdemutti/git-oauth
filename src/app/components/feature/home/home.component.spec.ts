import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeComponent } from './home.component';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { Repository } from '../../../models/repository.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let activatedRoute: ActivatedRouteStub;

  const repoInfo = {
    id: 111,
    name: 'Test repo',
    description: 'Description',
    private: false,
    url: 'urlhere',
    stargazers: 1,
    watchers: 2,
    language: 'javascript',
    forks: 1,
    isFork: false,
    ownerPicture: 'urlHere',
    ownerName: 'Name Here',
    ownerUrl: 'Urlhere'
  } as Repository;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
       ],
       providers: [
        { provide: ActivatedRoute, useValue: activatedRoute }
       ],
       schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('Component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Component should receive data from route', () => {
    const repos = [repoInfo];
    const repoData = {
      repos
    };
    activatedRoute.setParams(repoData);

    fixture.detectChanges();

    expect(component.repos).toEqual(repos);
  });
});
