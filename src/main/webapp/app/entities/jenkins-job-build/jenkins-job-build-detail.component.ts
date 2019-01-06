import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';

@Component({
    selector: 'jhi-jenkins-job-build-detail',
    templateUrl: './jenkins-job-build-detail.component.html'
})
export class JenkinsJobBuildDetailComponent implements OnInit {
    jenkinsJobBuild: IJenkinsJobBuild;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jenkinsJobBuild }) => {
            this.jenkinsJobBuild = jenkinsJobBuild;
        });
    }

    previousState() {
        window.history.back();
    }
}
