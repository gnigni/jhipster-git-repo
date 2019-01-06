import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGitCommitter } from 'app/shared/model/git-committer.model';
import { GitCommitterService } from './git-committer.service';

@Component({
    selector: 'jhi-git-committer-update',
    templateUrl: './git-committer-update.component.html'
})
export class GitCommitterUpdateComponent implements OnInit {
    gitCommitter: IGitCommitter;
    isSaving: boolean;

    constructor(protected gitCommitterService: GitCommitterService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gitCommitter }) => {
            this.gitCommitter = gitCommitter;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gitCommitter.id !== undefined) {
            this.subscribeToSaveResponse(this.gitCommitterService.update(this.gitCommitter));
        } else {
            this.subscribeToSaveResponse(this.gitCommitterService.create(this.gitCommitter));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGitCommitter>>) {
        result.subscribe((res: HttpResponse<IGitCommitter>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
