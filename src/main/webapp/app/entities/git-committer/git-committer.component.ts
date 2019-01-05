import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGitCommitter } from 'app/shared/model/git-committer.model';
import { AccountService } from 'app/core';
import { GitCommitterService } from './git-committer.service';

@Component({
    selector: 'jhi-git-committer',
    templateUrl: './git-committer.component.html'
})
export class GitCommitterComponent implements OnInit, OnDestroy {
    gitCommitters: IGitCommitter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected gitCommitterService: GitCommitterService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.gitCommitterService.query().subscribe(
            (res: HttpResponse<IGitCommitter[]>) => {
                this.gitCommitters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGitCommitters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGitCommitter) {
        return item.id;
    }

    registerChangeInGitCommitters() {
        this.eventSubscriber = this.eventManager.subscribe('gitCommitterListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
