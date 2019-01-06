import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGitCommit } from 'app/shared/model/git-commit.model';
import { AccountService } from 'app/core';
import { GitCommitService } from './git-commit.service';

@Component({
    selector: 'jhi-git-commit',
    templateUrl: './git-commit.component.html'
})
export class GitCommitComponent implements OnInit, OnDestroy {
    gitCommits: IGitCommit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected gitCommitService: GitCommitService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.gitCommitService.query().subscribe(
            (res: HttpResponse<IGitCommit[]>) => {
                this.gitCommits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGitCommits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGitCommit) {
        return item.id;
    }

    registerChangeInGitCommits() {
        this.eventSubscriber = this.eventManager.subscribe('gitCommitListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
