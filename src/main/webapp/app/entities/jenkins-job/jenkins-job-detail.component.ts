import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJenkinsJob } from 'app/shared/model/jenkins-job.model';

@Component({
    selector: 'jhi-jenkins-job-detail',
    templateUrl: './jenkins-job-detail.component.html'
})
export class JenkinsJobDetailComponent implements OnInit {
    jenkinsJob: IJenkinsJob;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jenkinsJob }) => {
            this.jenkinsJob = jenkinsJob;
        });
    }

    previousState() {
        window.history.back();
    }
}
