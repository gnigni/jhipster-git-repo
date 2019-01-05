/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsJobDetailComponent } from 'app/entities/jenkins-job/jenkins-job-detail.component';
import { JenkinsJob } from 'app/shared/model/jenkins-job.model';

describe('Component Tests', () => {
    describe('JenkinsJob Management Detail Component', () => {
        let comp: JenkinsJobDetailComponent;
        let fixture: ComponentFixture<JenkinsJobDetailComponent>;
        const route = ({ data: of({ jenkinsJob: new JenkinsJob(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsJobDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JenkinsJobDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JenkinsJobDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jenkinsJob).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
