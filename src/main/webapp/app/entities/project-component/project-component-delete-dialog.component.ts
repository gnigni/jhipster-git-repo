import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProjectComponent } from 'app/shared/model/project-component.model';
import { ProjectComponentService } from './project-component.service';

@Component({
    selector: 'jhi-project-component-delete-dialog',
    templateUrl: './project-component-delete-dialog.component.html'
})
export class ProjectComponentDeleteDialogComponent {
    projectComponent: IProjectComponent;

    constructor(
        protected projectComponentService: ProjectComponentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectComponentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'projectComponentListModification',
                content: 'Deleted an projectComponent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-component-delete-popup',
    template: ''
})
export class ProjectComponentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ projectComponent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProjectComponentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.projectComponent = projectComponent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
