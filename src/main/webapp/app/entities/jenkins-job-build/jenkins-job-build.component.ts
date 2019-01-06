import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IJenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';
import { AccountService } from 'app/core';
import { JenkinsJobBuildService } from './jenkins-job-build.service';

@Component({
    selector: 'jhi-jenkins-job-build',
    templateUrl: './jenkins-job-build.component.html'
})
export class JenkinsJobBuildComponent implements OnInit, OnDestroy {
    jenkinsJobBuilds: IJenkinsJobBuild[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected jenkinsJobBuildService: JenkinsJobBuildService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.jenkinsJobBuildService.query().subscribe(
            (res: HttpResponse<IJenkinsJobBuild[]>) => {
                this.jenkinsJobBuilds = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInJenkinsJobBuilds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IJenkinsJobBuild) {
        return item.id;
    }

    registerChangeInJenkinsJobBuilds() {
        this.eventSubscriber = this.eventManager.subscribe('jenkinsJobBuildListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
