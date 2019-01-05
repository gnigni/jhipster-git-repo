/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitRepoDetailComponent } from 'app/entities/git-repo/git-repo-detail.component';
import { GitRepo } from 'app/shared/model/git-repo.model';

describe('Component Tests', () => {
    describe('GitRepo Management Detail Component', () => {
        let comp: GitRepoDetailComponent;
        let fixture: ComponentFixture<GitRepoDetailComponent>;
        const route = ({ data: of({ gitRepo: new GitRepo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitRepoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GitRepoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GitRepoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gitRepo).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
