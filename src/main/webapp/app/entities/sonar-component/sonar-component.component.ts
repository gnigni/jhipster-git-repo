import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISonarComponent } from 'app/shared/model/sonar-component.model';
import { AccountService } from 'app/core';
import { SonarComponentService } from './sonar-component.service';

@Component({
    selector: 'jhi-sonar-component',
    templateUrl: './sonar-component.component.html'
})
export class SonarComponentComponent implements OnInit, OnDestroy {
    sonarComponents: ISonarComponent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sonarComponentService: SonarComponentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.sonarComponentService.query().subscribe(
            (res: HttpResponse<ISonarComponent[]>) => {
                this.sonarComponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSonarComponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISonarComponent) {
        return item.id;
    }

    registerChangeInSonarComponents() {
        this.eventSubscriber = this.eventManager.subscribe('sonarComponentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
