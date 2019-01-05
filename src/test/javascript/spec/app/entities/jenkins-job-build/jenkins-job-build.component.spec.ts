/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsJobBuildComponent } from 'app/entities/jenkins-job-build/jenkins-job-build.component';
import { JenkinsJobBuildService } from 'app/entities/jenkins-job-build/jenkins-job-build.service';
import { JenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';

describe('Component Tests', () => {
    describe('JenkinsJobBuild Management Component', () => {
        let comp: JenkinsJobBuildComponent;
        let fixture: ComponentFixture<JenkinsJobBuildComponent>;
        let service: JenkinsJobBuildService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsJobBuildComponent],
                providers: []
            })
                .overrideTemplate(JenkinsJobBuildComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JenkinsJobBuildComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobBuildService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new JenkinsJobBuild(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.jenkinsJobBuilds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
