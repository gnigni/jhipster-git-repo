/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsFolderDetailComponent } from 'app/entities/jenkins-folder/jenkins-folder-detail.component';
import { JenkinsFolder } from 'app/shared/model/jenkins-folder.model';

describe('Component Tests', () => {
    describe('JenkinsFolder Management Detail Component', () => {
        let comp: JenkinsFolderDetailComponent;
        let fixture: ComponentFixture<JenkinsFolderDetailComponent>;
        const route = ({ data: of({ jenkinsFolder: new JenkinsFolder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsFolderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JenkinsFolderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JenkinsFolderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jenkinsFolder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
