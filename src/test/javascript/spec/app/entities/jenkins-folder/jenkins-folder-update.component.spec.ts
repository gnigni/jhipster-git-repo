/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsFolderUpdateComponent } from 'app/entities/jenkins-folder/jenkins-folder-update.component';
import { JenkinsFolderService } from 'app/entities/jenkins-folder/jenkins-folder.service';
import { JenkinsFolder } from 'app/shared/model/jenkins-folder.model';

describe('Component Tests', () => {
    describe('JenkinsFolder Management Update Component', () => {
        let comp: JenkinsFolderUpdateComponent;
        let fixture: ComponentFixture<JenkinsFolderUpdateComponent>;
        let service: JenkinsFolderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsFolderUpdateComponent]
            })
                .overrideTemplate(JenkinsFolderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JenkinsFolderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsFolderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JenkinsFolder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jenkinsFolder = entity;
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
                    const entity = new JenkinsFolder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jenkinsFolder = entity;
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
