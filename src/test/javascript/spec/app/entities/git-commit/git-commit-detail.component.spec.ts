/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitCommitDetailComponent } from 'app/entities/git-commit/git-commit-detail.component';
import { GitCommit } from 'app/shared/model/git-commit.model';

describe('Component Tests', () => {
    describe('GitCommit Management Detail Component', () => {
        let comp: GitCommitDetailComponent;
        let fixture: ComponentFixture<GitCommitDetailComponent>;
        const route = ({ data: of({ gitCommit: new GitCommit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitCommitDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GitCommitDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GitCommitDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gitCommit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
