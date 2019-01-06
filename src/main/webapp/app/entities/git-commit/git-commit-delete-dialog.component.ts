import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGitCommit } from 'app/shared/model/git-commit.model';
import { GitCommitService } from './git-commit.service';

@Component({
    selector: 'jhi-git-commit-delete-dialog',
    templateUrl: './git-commit-delete-dialog.component.html'
})
export class GitCommitDeleteDialogComponent {
    gitCommit: IGitCommit;

    constructor(
        protected gitCommitService: GitCommitService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gitCommitService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gitCommitListModification',
                content: 'Deleted an gitCommit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-git-commit-delete-popup',
    template: ''
})
export class GitCommitDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gitCommit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GitCommitDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gitCommit = gitCommit;
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
