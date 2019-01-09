import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IGitRepo } from 'app/shared/model/git-repo.model';
import { GitRepoService } from './git-repo.service';
import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from 'app/entities/application';

@Component({
    selector: 'jhi-git-repo-update',
    templateUrl: './git-repo-update.component.html'
})
export class GitRepoUpdateComponent implements OnInit {
    gitRepo: IGitRepo;
    isSaving: boolean;

    applications: IApplication[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected gitRepoService: GitRepoService,
        protected applicationService: ApplicationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gitRepo }) => {
            this.gitRepo = gitRepo;
        });
        this.applicationService.query().subscribe(
            (res: HttpResponse<IApplication[]>) => {
                this.applications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gitRepo.id !== undefined) {
            this.subscribeToSaveResponse(this.gitRepoService.update(this.gitRepo));
        } else {
            this.subscribeToSaveResponse(this.gitRepoService.create(this.gitRepo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGitRepo>>) {
        result.subscribe((res: HttpResponse<IGitRepo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
