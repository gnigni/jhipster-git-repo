/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitCommitterDetailComponent } from 'app/entities/git-committer/git-committer-detail.component';
import { GitCommitter } from 'app/shared/model/git-committer.model';

describe('Component Tests', () => {
    describe('GitCommitter Management Detail Component', () => {
        let comp: GitCommitterDetailComponent;
        let fixture: ComponentFixture<GitCommitterDetailComponent>;
        const route = ({ data: of({ gitCommitter: new GitCommitter(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitCommitterDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GitCommitterDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GitCommitterDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gitCommitter).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
