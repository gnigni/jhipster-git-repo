import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IJenkinsFolder } from 'app/shared/model/jenkins-folder.model';
import { JenkinsFolderService } from './jenkins-folder.service';
import { IProjectComponent } from 'app/shared/model/project-component.model';
import { ProjectComponentService } from 'app/entities/project-component';

@Component({
    selector: 'jhi-jenkins-folder-update',
    templateUrl: './jenkins-folder-update.component.html'
})
export class JenkinsFolderUpdateComponent implements OnInit {
    jenkinsFolder: IJenkinsFolder;
    isSaving: boolean;

    components: IProjectComponent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jenkinsFolderService: JenkinsFolderService,
        protected projectComponentService: ProjectComponentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jenkinsFolder }) => {
            this.jenkinsFolder = jenkinsFolder;
        });
        this.projectComponentService.query({ filter: 'jenkinsfolder-is-null' }).subscribe(
            (res: HttpResponse<IProjectComponent[]>) => {
                if (!this.jenkinsFolder.component || !this.jenkinsFolder.component.id) {
                    this.components = res.body;
                } else {
                    this.projectComponentService.find(this.jenkinsFolder.component.id).subscribe(
                        (subRes: HttpResponse<IProjectComponent>) => {
                            this.components = [subRes.body].concat(res.body);
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
        if (this.jenkinsFolder.id !== undefined) {
            this.subscribeToSaveResponse(this.jenkinsFolderService.update(this.jenkinsFolder));
        } else {
            this.subscribeToSaveResponse(this.jenkinsFolderService.create(this.jenkinsFolder));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJenkinsFolder>>) {
        result.subscribe((res: HttpResponse<IJenkinsFolder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectComponentById(index: number, item: IProjectComponent) {
        return item.id;
    }
}
