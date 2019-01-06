import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGitCommit } from 'app/shared/model/git-commit.model';

@Component({
    selector: 'jhi-git-commit-detail',
    templateUrl: './git-commit-detail.component.html'
})
export class GitCommitDetailComponent implements OnInit {
    gitCommit: IGitCommit;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gitCommit }) => {
            this.gitCommit = gitCommit;
        });
    }

    previousState() {
        window.history.back();
    }
}
