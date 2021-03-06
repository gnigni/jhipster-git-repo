/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsFolderDeleteDialogComponent } from 'app/entities/jenkins-folder/jenkins-folder-delete-dialog.component';
import { JenkinsFolderService } from 'app/entities/jenkins-folder/jenkins-folder.service';

describe('Component Tests', () => {
    describe('JenkinsFolder Management Delete Component', () => {
        let comp: JenkinsFolderDeleteDialogComponent;
        let fixture: ComponentFixture<JenkinsFolderDeleteDialogComponent>;
        let service: JenkinsFolderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsFolderDeleteDialogComponent]
            })
                .overrideTemplate(JenkinsFolderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JenkinsFolderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsFolderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
