import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';
import { JenkinsJobBuildService } from './jenkins-job-build.service';

@Component({
    selector: 'jhi-jenkins-job-build-delete-dialog',
    templateUrl: './jenkins-job-build-delete-dialog.component.html'
})
export class JenkinsJobBuildDeleteDialogComponent {
    jenkinsJobBuild: IJenkinsJobBuild;

    constructor(
        protected jenkinsJobBuildService: JenkinsJobBuildService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jenkinsJobBuildService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jenkinsJobBuildListModification',
                content: 'Deleted an jenkinsJobBuild'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jenkins-job-build-delete-popup',
    template: ''
})
export class JenkinsJobBuildDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jenkinsJobBuild }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JenkinsJobBuildDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.jenkinsJobBuild = jenkinsJobBuild;
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
