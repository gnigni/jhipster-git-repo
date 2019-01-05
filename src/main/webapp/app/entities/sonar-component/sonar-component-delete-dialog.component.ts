import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISonarComponent } from 'app/shared/model/sonar-component.model';
import { SonarComponentService } from './sonar-component.service';

@Component({
    selector: 'jhi-sonar-component-delete-dialog',
    templateUrl: './sonar-component-delete-dialog.component.html'
})
export class SonarComponentDeleteDialogComponent {
    sonarComponent: ISonarComponent;

    constructor(
        protected sonarComponentService: SonarComponentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sonarComponentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sonarComponentListModification',
                content: 'Deleted an sonarComponent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sonar-component-delete-popup',
    template: ''
})
export class SonarComponentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sonarComponent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SonarComponentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sonarComponent = sonarComponent;
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
