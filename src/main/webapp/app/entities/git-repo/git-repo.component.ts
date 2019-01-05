import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGitRepo } from 'app/shared/model/git-repo.model';
import { AccountService } from 'app/core';
import { GitRepoService } from './git-repo.service';

@Component({
    selector: 'jhi-git-repo',
    templateUrl: './git-repo.component.html'
})
export class GitRepoComponent implements OnInit, OnDestroy {
    gitRepos: IGitRepo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected gitRepoService: GitRepoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.gitRepoService.query().subscribe(
            (res: HttpResponse<IGitRepo[]>) => {
                this.gitRepos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGitRepos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGitRepo) {
        return item.id;
    }

    registerChangeInGitRepos() {
        this.eventSubscriber = this.eventManager.subscribe('gitRepoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
