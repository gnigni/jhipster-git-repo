/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitRepoComponent } from 'app/entities/git-repo/git-repo.component';
import { GitRepoService } from 'app/entities/git-repo/git-repo.service';
import { GitRepo } from 'app/shared/model/git-repo.model';

describe('Component Tests', () => {
    describe('GitRepo Management Component', () => {
        let comp: GitRepoComponent;
        let fixture: ComponentFixture<GitRepoComponent>;
        let service: GitRepoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitRepoComponent],
                providers: []
            })
                .overrideTemplate(GitRepoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GitRepoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitRepoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GitRepo(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gitRepos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
