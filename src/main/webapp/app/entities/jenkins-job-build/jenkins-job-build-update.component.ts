import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IJenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';
import { JenkinsJobBuildService } from './jenkins-job-build.service';
import { IJenkinsJob } from 'app/shared/model/jenkins-job.model';
import { JenkinsJobService } from 'app/entities/jenkins-job';

@Component({
    selector: 'jhi-jenkins-job-build-update',
    templateUrl: './jenkins-job-build-update.component.html'
})
export class JenkinsJobBuildUpdateComponent implements OnInit {
    jenkinsJobBuild: IJenkinsJobBuild;
    isSaving: boolean;

    jenkinsjobs: IJenkinsJob[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jenkinsJobBuildService: JenkinsJobBuildService,
        protected jenkinsJobService: JenkinsJobService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jenkinsJobBuild }) => {
            this.jenkinsJobBuild = jenkinsJobBuild;
        });
        this.jenkinsJobService.query().subscribe(
            (res: HttpResponse<IJenkinsJob[]>) => {
                this.jenkinsjobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jenkinsJobBuild.id !== undefined) {
            this.subscribeToSaveResponse(this.jenkinsJobBuildService.update(this.jenkinsJobBuild));
        } else {
            this.subscribeToSaveResponse(this.jenkinsJobBuildService.create(this.jenkinsJobBuild));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJenkinsJobBuild>>) {
        result.subscribe((res: HttpResponse<IJenkinsJobBuild>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackJenkinsJobById(index: number, item: IJenkinsJob) {
        return item.id;
    }
}
