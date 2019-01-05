import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGitCommitter } from 'app/shared/model/git-committer.model';

@Component({
    selector: 'jhi-git-committer-detail',
    templateUrl: './git-committer-detail.component.html'
})
export class GitCommitterDetailComponent implements OnInit {
    gitCommitter: IGitCommitter;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gitCommitter }) => {
            this.gitCommitter = gitCommitter;
        });
    }

    previousState() {
        window.history.back();
    }
}
