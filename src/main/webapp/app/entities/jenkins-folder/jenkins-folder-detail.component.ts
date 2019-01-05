import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJenkinsFolder } from 'app/shared/model/jenkins-folder.model';

@Component({
    selector: 'jhi-jenkins-folder-detail',
    templateUrl: './jenkins-folder-detail.component.html'
})
export class JenkinsFolderDetailComponent implements OnInit {
    jenkinsFolder: IJenkinsFolder;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ jenkinsFolder }) => {
            this.jenkinsFolder = jenkinsFolder;
        });
    }

    previousState() {
        window.history.back();
    }
}
