import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGitCommitter } from 'app/shared/model/git-committer.model';
import { GitCommitterService } from './git-committer.service';

@Component({
    selector: 'jhi-git-committer-delete-dialog',
    templateUrl: './git-committer-delete-dialog.component.html'
})
export class GitCommitterDeleteDialogComponent {
    gitCommitter: IGitCommitter;

    constructor(
        protected gitCommitterService: GitCommitterService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gitCommitterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gitCommitterListModification',
                content: 'Deleted an gitCommitter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-git-committer-delete-popup',
    template: ''
})
export class GitCommitterDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gitCommitter }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GitCommitterDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gitCommitter = gitCommitter;
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
