import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplication } from 'app/shared/model/application.model';

@Component({
    selector: 'jhi-application-detail',
    templateUrl: './application-detail.component.html'
})
export class ApplicationDetailComponent implements OnInit {
    application: IApplication;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ application }) => {
            this.application = application;
        });
    }

    previousState() {
        window.history.back();
    }
}
