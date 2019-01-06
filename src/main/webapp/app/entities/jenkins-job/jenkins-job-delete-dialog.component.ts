import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJenkinsJob } from 'app/shared/model/jenkins-job.model';
import { JenkinsJobService } from './jenkins-job.service';

@Component({
    selector: 'jhi-jenkins-job-delete-dialog',
    templateUrl: './jenkins-job-delete-dialog.component.html'
})
export class JenkinsJobDeleteDialogComponent {
    jenkinsJob: IJenkinsJob;

    constructor(
        protected jenkinsJobService: JenkinsJobService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jenkinsJobService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jenkinsJobListModification',
                content: 'Deleted an jenkinsJob'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jenkins-job-delete-popup',
    template: ''
})
export class JenkinsJobDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jenkinsJob }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(JenkinsJobDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.jenkinsJob = jenkinsJob;
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
