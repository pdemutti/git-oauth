import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryComponent } from './repository.component';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;

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
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show repo info', () => {
      component.repo = repoInfo;
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      // Testing if description is on the HTML
      expect(compiled.querySelector('p').textContent).toContain(repoInfo.description);
  });
});
