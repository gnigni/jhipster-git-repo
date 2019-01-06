import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProjectComponent } from 'app/shared/model/project-component.model';
import { ProjectComponentService } from './project-component.service';
import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from 'app/entities/application';
import { IGitRepo } from 'app/shared/model/git-repo.model';
import { GitRepoService } from 'app/entities/git-repo';

@Component({
    selector: 'jhi-project-component-update',
    templateUrl: './project-component-update.component.html'
})
export class ProjectComponentUpdateComponent implements OnInit {
    projectComponent: IProjectComponent;
    isSaving: boolean;

    applications: IApplication[];

    projectcomponents: IProjectComponent[];

    gitrepos: IGitRepo[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected projectComponentService: ProjectComponentService,
        protected applicationService: ApplicationService,
        protected gitRepoService: GitRepoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ projectComponent }) => {
            this.projectComponent = projectComponent;
        });
        this.applicationService.query().subscribe(
            (res: HttpResponse<IApplication[]>) => {
                this.applications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.projectComponentService.query().subscribe(
            (res: HttpResponse<IProjectComponent[]>) => {
                this.projectcomponents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gitRepoService.query().subscribe(
            (res: HttpResponse<IGitRepo[]>) => {
                this.gitrepos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.projectComponent.id !== undefined) {
            this.subscribeToSaveResponse(this.projectComponentService.update(this.projectComponent));
        } else {
            this.subscribeToSaveResponse(this.projectComponentService.create(this.projectComponent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjectComponent>>) {
        result.subscribe((res: HttpResponse<IProjectComponent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackApplicationById(index: number, item: IApplication) {
        return item.id;
    }

    trackProjectComponentById(index: number, item: IProjectComponent) {
        return item.id;
    }

    trackGitRepoById(index: number, item: IGitRepo) {
        return item.id;
    }
}
