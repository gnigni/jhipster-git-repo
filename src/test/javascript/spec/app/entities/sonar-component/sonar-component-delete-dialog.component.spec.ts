/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipGitRepoTestModule } from '../../../test.module';
import { SonarComponentDeleteDialogComponent } from 'app/entities/sonar-component/sonar-component-delete-dialog.component';
import { SonarComponentService } from 'app/entities/sonar-component/sonar-component.service';

describe('Component Tests', () => {
    describe('SonarComponent Management Delete Component', () => {
        let comp: SonarComponentDeleteDialogComponent;
        let fixture: ComponentFixture<SonarComponentDeleteDialogComponent>;
        let service: SonarComponentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [SonarComponentDeleteDialogComponent]
            })
                .overrideTemplate(SonarComponentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SonarComponentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SonarComponentService);
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
