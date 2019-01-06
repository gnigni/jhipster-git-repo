/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsJobBuildDetailComponent } from 'app/entities/jenkins-job-build/jenkins-job-build-detail.component';
import { JenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';

describe('Component Tests', () => {
    describe('JenkinsJobBuild Management Detail Component', () => {
        let comp: JenkinsJobBuildDetailComponent;
        let fixture: ComponentFixture<JenkinsJobBuildDetailComponent>;
        const route = ({ data: of({ jenkinsJobBuild: new JenkinsJobBuild(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsJobBuildDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JenkinsJobBuildDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JenkinsJobBuildDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jenkinsJobBuild).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
