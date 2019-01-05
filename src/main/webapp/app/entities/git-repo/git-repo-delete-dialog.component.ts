import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGitRepo } from 'app/shared/model/git-repo.model';
import { GitRepoService } from './git-repo.service';

@Component({
    selector: 'jhi-git-repo-delete-dialog',
    templateUrl: './git-repo-delete-dialog.component.html'
})
export class GitRepoDeleteDialogComponent {
    gitRepo: IGitRepo;

    constructor(protected gitRepoService: GitRepoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gitRepoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gitRepoListModification',
                content: 'Deleted an gitRepo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-git-repo-delete-popup',
    template: ''
})
export class GitRepoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gitRepo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GitRepoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gitRepo = gitRepo;
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
