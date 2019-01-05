import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGitRepo } from 'app/shared/model/git-repo.model';
import { GitRepoService } from './git-repo.service';

@Component({
    selector: 'jhi-git-repo-update',
    templateUrl: './git-repo-update.component.html'
})
export class GitRepoUpdateComponent implements OnInit {
    gitRepo: IGitRepo;
    isSaving: boolean;

    constructor(protected gitRepoService: GitRepoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gitRepo }) => {
            this.gitRepo = gitRepo;
        });
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
}
