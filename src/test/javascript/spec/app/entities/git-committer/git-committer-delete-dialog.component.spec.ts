/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipGitRepoTestModule } from '../../../test.module';
import { GitCommitterDeleteDialogComponent } from 'app/entities/git-committer/git-committer-delete-dialog.component';
import { GitCommitterService } from 'app/entities/git-committer/git-committer.service';

describe('Component Tests', () => {
    describe('GitCommitter Management Delete Component', () => {
        let comp: GitCommitterDeleteDialogComponent;
        let fixture: ComponentFixture<GitCommitterDeleteDialogComponent>;
        let service: GitCommitterService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [GitCommitterDeleteDialogComponent]
            })
                .overrideTemplate(GitCommitterDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GitCommitterDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitCommitterService);
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
