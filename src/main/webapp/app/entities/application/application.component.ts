import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IApplication } from 'app/shared/model/application.model';
import { AccountService } from 'app/core';
import { ApplicationService } from './application.service';

@Component({
    selector: 'jhi-application',
    templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit, OnDestroy {
    applications: IApplication[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected applicationService: ApplicationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.applicationService.query().subscribe(
            (res: HttpResponse<IApplication[]>) => {
                this.applications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInApplications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IApplication) {
        return item.id;
    }

    registerChangeInApplications() {
        this.eventSubscriber = this.eventManager.subscribe('applicationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
