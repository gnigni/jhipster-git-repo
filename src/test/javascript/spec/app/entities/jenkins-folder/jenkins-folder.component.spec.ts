/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsFolderComponent } from 'app/entities/jenkins-folder/jenkins-folder.component';
import { JenkinsFolderService } from 'app/entities/jenkins-folder/jenkins-folder.service';
import { JenkinsFolder } from 'app/shared/model/jenkins-folder.model';

describe('Component Tests', () => {
    describe('JenkinsFolder Management Component', () => {
        let comp: JenkinsFolderComponent;
        let fixture: ComponentFixture<JenkinsFolderComponent>;
        let service: JenkinsFolderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsFolderComponent],
                providers: []
            })
                .overrideTemplate(JenkinsFolderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JenkinsFolderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsFolderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new JenkinsFolder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.jenkinsFolders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
