import { TestBed } from '@angular/core/testing';
import { HomeResolverService } from './home-resolver.service';
import { GithubService } from 'src/app/services/github.service';
import { cold } from 'jasmine-marbles';

describe('HomeResolverService', () => {
  const githubSpy = jasmine.createSpyObj('GithubService', ['getRepositories']);

  let homeResolverService: HomeResolverService;
  let githubServiceMock: jasmine.SpyObj<GithubService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeResolverService,
        { provide: GithubService, useValue: githubSpy}
      ]
    });
    homeResolverService = TestBed.get(HomeResolverService);

    const $q = cold('---x|', {x: []});
    githubServiceMock = TestBed.get(GithubService);
    githubServiceMock.getRepositories.and.returnValue($q);
  });

  it('Component should be created', () => {
    expect(homeResolverService).toBeTruthy();
  });

  it('Component should retrieve repositories details', () => {
    homeResolverService.resolve(null, null);
    expect(githubServiceMock.getRepositories).toHaveBeenCalled();
  });
});
