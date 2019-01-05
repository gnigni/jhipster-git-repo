/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsJobComponent } from 'app/entities/jenkins-job/jenkins-job.component';
import { JenkinsJobService } from 'app/entities/jenkins-job/jenkins-job.service';
import { JenkinsJob } from 'app/shared/model/jenkins-job.model';

describe('Component Tests', () => {
    describe('JenkinsJob Management Component', () => {
        let comp: JenkinsJobComponent;
        let fixture: ComponentFixture<JenkinsJobComponent>;
        let service: JenkinsJobService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsJobComponent],
                providers: []
            })
                .overrideTemplate(JenkinsJobComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JenkinsJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new JenkinsJob(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.jenkinsJobs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
