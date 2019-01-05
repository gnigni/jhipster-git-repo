import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';

@Component({
    selector: 'jhi-application-update',
    templateUrl: './application-update.component.html'
})
export class ApplicationUpdateComponent implements OnInit {
    application: IApplication;
    isSaving: boolean;

    constructor(protected applicationService: ApplicationService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ application }) => {
            this.application = application;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.application.id !== undefined) {
            this.subscribeToSaveResponse(this.applicationService.update(this.application));
        } else {
            this.subscribeToSaveResponse(this.applicationService.create(this.application));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplication>>) {
        result.subscribe((res: HttpResponse<IApplication>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
