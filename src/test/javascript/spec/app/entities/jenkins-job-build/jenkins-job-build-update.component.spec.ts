/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsJobBuildUpdateComponent } from 'app/entities/jenkins-job-build/jenkins-job-build-update.component';
import { JenkinsJobBuildService } from 'app/entities/jenkins-job-build/jenkins-job-build.service';
import { JenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';

describe('Component Tests', () => {
    describe('JenkinsJobBuild Management Update Component', () => {
        let comp: JenkinsJobBuildUpdateComponent;
        let fixture: ComponentFixture<JenkinsJobBuildUpdateComponent>;
        let service: JenkinsJobBuildService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsJobBuildUpdateComponent]
            })
                .overrideTemplate(JenkinsJobBuildUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JenkinsJobBuildUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobBuildService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JenkinsJobBuild(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jenkinsJobBuild = entity;
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
                    const entity = new JenkinsJobBuild();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jenkinsJobBuild = entity;
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
