import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IJenkinsJob } from 'app/shared/model/jenkins-job.model';
import { AccountService } from 'app/core';
import { JenkinsJobService } from './jenkins-job.service';

@Component({
    selector: 'jhi-jenkins-job',
    templateUrl: './jenkins-job.component.html'
})
export class JenkinsJobComponent implements OnInit, OnDestroy {
    jenkinsJobs: IJenkinsJob[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected jenkinsJobService: JenkinsJobService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.jenkinsJobService.query().subscribe(
            (res: HttpResponse<IJenkinsJob[]>) => {
                this.jenkinsJobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInJenkinsJobs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IJenkinsJob) {
        return item.id;
    }

    registerChangeInJenkinsJobs() {
        this.eventSubscriber = this.eventManager.subscribe('jenkinsJobListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
