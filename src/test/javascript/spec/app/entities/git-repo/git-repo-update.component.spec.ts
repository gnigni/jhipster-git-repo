/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitRepoUpdateComponent } from 'app/entities/git-repo/git-repo-update.component';
import { GitRepoService } from 'app/entities/git-repo/git-repo.service';
import { GitRepo } from 'app/shared/model/git-repo.model';

describe('Component Tests', () => {
    describe('GitRepo Management Update Component', () => {
        let comp: GitRepoUpdateComponent;
        let fixture: ComponentFixture<GitRepoUpdateComponent>;
        let service: GitRepoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitRepoUpdateComponent]
            })
                .overrideTemplate(GitRepoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GitRepoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitRepoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GitRepo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gitRepo = entity;
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
                    const entity = new GitRepo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gitRepo = entity;
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
