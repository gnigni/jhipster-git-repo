/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitCommitterUpdateComponent } from 'app/entities/git-committer/git-committer-update.component';
import { GitCommitterService } from 'app/entities/git-committer/git-committer.service';
import { GitCommitter } from 'app/shared/model/git-committer.model';

describe('Component Tests', () => {
    describe('GitCommitter Management Update Component', () => {
        let comp: GitCommitterUpdateComponent;
        let fixture: ComponentFixture<GitCommitterUpdateComponent>;
        let service: GitCommitterService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitCommitterUpdateComponent]
            })
                .overrideTemplate(GitCommitterUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GitCommitterUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitCommitterService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GitCommitter(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gitCommitter = entity;
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
                    const entity = new GitCommitter();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gitCommitter = entity;
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
