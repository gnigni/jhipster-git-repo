import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGitRepo } from 'app/shared/model/git-repo.model';

@Component({
    selector: 'jhi-git-repo-detail',
    templateUrl: './git-repo-detail.component.html'
})
export class GitRepoDetailComponent implements OnInit {
    gitRepo: IGitRepo;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gitRepo }) => {
            this.gitRepo = gitRepo;
        });
    }

    previousState() {
        window.history.back();
    }
}
