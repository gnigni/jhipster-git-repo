/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipGitRepoTestModule } from '../../../test.module';
import { JenkinsJobDeleteDialogComponent } from 'app/entities/jenkins-job/jenkins-job-delete-dialog.component';
import { JenkinsJobService } from 'app/entities/jenkins-job/jenkins-job.service';

describe('Component Tests', () => {
    describe('JenkinsJob Management Delete Component', () => {
        let comp: JenkinsJobDeleteDialogComponent;
        let fixture: ComponentFixture<JenkinsJobDeleteDialogComponent>;
        let service: JenkinsJobService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [JenkinsJobDeleteDialogComponent]
            })
                .overrideTemplate(JenkinsJobDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JenkinsJobDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobService);
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
