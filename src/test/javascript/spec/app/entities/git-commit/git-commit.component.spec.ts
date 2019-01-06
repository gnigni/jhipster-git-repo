/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitCommitComponent } from 'app/entities/git-commit/git-commit.component';
import { GitCommitService } from 'app/entities/git-commit/git-commit.service';
import { GitCommit } from 'app/shared/model/git-commit.model';

describe('Component Tests', () => {
    describe('GitCommit Management Component', () => {
        let comp: GitCommitComponent;
        let fixture: ComponentFixture<GitCommitComponent>;
        let service: GitCommitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitCommitComponent],
                providers: []
            })
                .overrideTemplate(GitCommitComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GitCommitComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitCommitService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GitCommit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gitCommits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
