/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitCommitUpdateComponent } from 'app/entities/git-commit/git-commit-update.component';
import { GitCommitService } from 'app/entities/git-commit/git-commit.service';
import { GitCommit } from 'app/shared/model/git-commit.model';

describe('Component Tests', () => {
    describe('GitCommit Management Update Component', () => {
        let comp: GitCommitUpdateComponent;
        let fixture: ComponentFixture<GitCommitUpdateComponent>;
        let service: GitCommitService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitCommitUpdateComponent]
            })
                .overrideTemplate(GitCommitUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GitCommitUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitCommitService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GitCommit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gitCommit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GitCommit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gitCommit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
