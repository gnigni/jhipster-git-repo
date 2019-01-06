import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IGitCommit } from 'app/shared/model/git-commit.model';
import { GitCommitService } from './git-commit.service';
import { IGitRepo } from 'app/shared/model/git-repo.model';
import { GitRepoService } from 'app/entities/git-repo';
import { IGitCommitter } from 'app/shared/model/git-committer.model';
import { GitCommitterService } from 'app/entities/git-committer';

@Component({
    selector: 'jhi-git-commit-update',
    templateUrl: './git-commit-update.component.html'
})
export class GitCommitUpdateComponent implements OnInit {
    gitCommit: IGitCommit;
    isSaving: boolean;

    gitrepos: IGitRepo[];

    gitcommits: IGitCommit[];

    gitcommitters: IGitCommitter[];
    commitDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected gitCommitService: GitCommitService,
        protected gitRepoService: GitRepoService,
        protected gitCommitterService: GitCommitterService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gitCommit }) => {
            this.gitCommit = gitCommit;
            this.commitDate = this.gitCommit.commitDate != null ? this.gitCommit.commitDate.format(DATE_TIME_FORMAT) : null;
        });
        this.gitRepoService.query().subscribe(
            (res: HttpResponse<IGitRepo[]>) => {
                this.gitrepos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gitCommitService.query().subscribe(
            (res: HttpResponse<IGitCommit[]>) => {
                this.gitcommits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.gitCommitterService.query().subscribe(
            (res: HttpResponse<IGitCommitter[]>) => {
                this.gitcommitters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.gitCommit.commitDate = this.commitDate != null ? moment(this.commitDate, DATE_TIME_FORMAT) : null;
        if (this.gitCommit.id !== undefined) {
            this.subscribeToSaveResponse(this.gitCommitService.update(this.gitCommit));
        } else {
            this.subscribeToSaveResponse(this.gitCommitService.create(this.gitCommit));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGitCommit>>) {
        result.subscribe((res: HttpResponse<IGitCommit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGitRepoById(index: number, item: IGitRepo) {
        return item.id;
    }

    trackGitCommitById(index: number, item: IGitCommit) {
        return item.id;
    }

    trackGitCommitterById(index: number, item: IGitCommitter) {
        return item.id;
    }
}
