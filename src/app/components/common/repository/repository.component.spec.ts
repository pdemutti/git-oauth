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
    url: 'url',
    stargazers: 1,
    watchers: 2,
    language: 'javascript',
    forks: 1,
    isFork: false,
    ownerPicture: 'url',
    ownerName: 'Name',
    ownerUrl: 'url'
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

  it('Component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Component should compile repository details', () => {
      component.repo = repoInfo;
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('p').textContent).toContain(repoInfo.description);
  });
});
