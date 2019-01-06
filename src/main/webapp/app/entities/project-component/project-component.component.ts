import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProjectComponent } from 'app/shared/model/project-component.model';
import { AccountService } from 'app/core';
import { ProjectComponentService } from './project-component.service';

@Component({
    selector: 'jhi-project-component',
    templateUrl: './project-component.component.html'
})
export class ProjectComponentComponent implements OnInit, OnDestroy {
    projectComponents: IProjectComponent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected projectComponentService: ProjectComponentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.projectComponentService.query().subscribe(
            (res: HttpResponse<IProjectComponent[]>) => {
                this.projectComponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProjectComponents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProjectComponent) {
        return item.id;
    }

    registerChangeInProjectComponents() {
        this.eventSubscriber = this.eventManager.subscribe('projectComponentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
