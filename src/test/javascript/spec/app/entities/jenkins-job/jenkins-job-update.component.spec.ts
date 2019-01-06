/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsJobUpdateComponent } from 'app/entities/jenkins-job/jenkins-job-update.component';
import { JenkinsJobService } from 'app/entities/jenkins-job/jenkins-job.service';
import { JenkinsJob } from 'app/shared/model/jenkins-job.model';

describe('Component Tests', () => {
    describe('JenkinsJob Management Update Component', () => {
        let comp: JenkinsJobUpdateComponent;
        let fixture: ComponentFixture<JenkinsJobUpdateComponent>;
        let service: JenkinsJobService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsJobUpdateComponent]
            })
                .overrideTemplate(JenkinsJobUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JenkinsJobUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JenkinsJob(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jenkinsJob = entity;
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
                    const entity = new JenkinsJob();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jenkinsJob = entity;
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
