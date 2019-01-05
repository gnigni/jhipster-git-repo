/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitCommitterComponent } from 'app/entities/git-committer/git-committer.component';
import { GitCommitterService } from 'app/entities/git-committer/git-committer.service';
import { GitCommitter } from 'app/shared/model/git-committer.model';

describe('Component Tests', () => {
    describe('GitCommitter Management Component', () => {
        let comp: GitCommitterComponent;
        let fixture: ComponentFixture<GitCommitterComponent>;
        let service: GitCommitterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitCommitterComponent],
                providers: []
            })
                .overrideTemplate(GitCommitterComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GitCommitterComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitCommitterService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GitCommitter(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gitCommitters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
