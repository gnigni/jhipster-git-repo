import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IJenkinsFolder } from 'app/shared/model/jenkins-folder.model';
import { AccountService } from 'app/core';
import { JenkinsFolderService } from './jenkins-folder.service';

@Component({
    selector: 'jhi-jenkins-folder',
    templateUrl: './jenkins-folder.component.html'
})
export class JenkinsFolderComponent implements OnInit, OnDestroy {
    jenkinsFolders: IJenkinsFolder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected jenkinsFolderService: JenkinsFolderService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.jenkinsFolderService.query().subscribe(
            (res: HttpResponse<IJenkinsFolder[]>) => {
                this.jenkinsFolders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInJenkinsFolders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IJenkinsFolder) {
        return item.id;
    }

    registerChangeInJenkinsFolders() {
        this.eventSubscriber = this.eventManager.subscribe('jenkinsFolderListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
