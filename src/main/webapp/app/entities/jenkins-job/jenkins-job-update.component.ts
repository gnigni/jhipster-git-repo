import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IJenkinsJob } from 'app/shared/model/jenkins-job.model';
import { JenkinsJobService } from './jenkins-job.service';
import { IJenkinsFolder } from 'app/shared/model/jenkins-folder.model';
import { JenkinsFolderService } from 'app/entities/jenkins-folder';

@Component({
    selector: 'jhi-jenkins-job-update',
    templateUrl: './jenkins-job-update.component.html'
})
export class JenkinsJobUpdateComponent implements OnInit {
    jenkinsJob: IJenkinsJob;
    isSaving: boolean;

    jenkinsfolders: IJenkinsFolder[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jenkinsJobService: JenkinsJobService,
        protected jenkinsFolderService: JenkinsFolderService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jenkinsJob }) => {
            this.jenkinsJob = jenkinsJob;
        });
        this.jenkinsFolderService.query({ filter: 'jenkinsjob-is-null' }).subscribe(
            (res: HttpResponse<IJenkinsFolder[]>) => {
                if (!this.jenkinsJob.jenkinsFolder || !this.jenkinsJob.jenkinsFolder.id) {
                    this.jenkinsfolders = res.body;
                } else {
                    this.jenkinsFolderService.find(this.jenkinsJob.jenkinsFolder.id).subscribe(
                        (subRes: HttpResponse<IJenkinsFolder>) => {
                            this.jenkinsfolders = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.jenkinsJob.id !== undefined) {
            this.subscribeToSaveResponse(this.jenkinsJobService.update(this.jenkinsJob));
        } else {
            this.subscribeToSaveResponse(this.jenkinsJobService.create(this.jenkinsJob));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJenkinsJob>>) {
        result.subscribe((res: HttpResponse<IJenkinsJob>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackJenkinsFolderById(index: number, item: IJenkinsFolder) {
        return item.id;
    }
}
