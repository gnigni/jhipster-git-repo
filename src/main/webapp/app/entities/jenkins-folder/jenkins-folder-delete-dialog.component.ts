import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJenkinsFolder } from 'app/shared/model/jenkins-folder.model';
import { JenkinsFolderService } from './jenkins-folder.service';

@Component({
    selector: 'jhi-jenkins-folder-delete-dialog',
    templateUrl: './jenkins-folder-delete-dialog.component.html'
})
export class JenkinsFolderDeleteDialogComponent {
    jenkinsFolder: IJenkinsFolder;

    constructor(
        protected jenkinsFolderService: JenkinsFolderService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jenkinsFolderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jenkinsFolderListModification',
                content: 'Deleted an jenkinsFolder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jenkins-folder-delete-popup',
    template: ''
})
export class JenkinsFolderDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jenkinsFolder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JenkinsFolderDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.jenkinsFolder = jenkinsFolder;
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
