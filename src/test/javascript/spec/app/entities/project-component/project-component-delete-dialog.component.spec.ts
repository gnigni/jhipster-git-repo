/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipGitRepoTestModule } from '../../../test.module';
import { ProjectComponentDeleteDialogComponent } from 'app/entities/project-component/project-component-delete-dialog.component';
import { ProjectComponentService } from 'app/entities/project-component/project-component.service';

describe('Component Tests', () => {
    describe('ProjectComponent Management Delete Component', () => {
        let comp: ProjectComponentDeleteDialogComponent;
        let fixture: ComponentFixture<ProjectComponentDeleteDialogComponent>;
        let service: ProjectComponentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [ProjectComponentDeleteDialogComponent]
            })
                .overrideTemplate(ProjectComponentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectComponentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectComponentService);
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
