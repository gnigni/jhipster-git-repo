import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectComponent } from 'app/shared/model/project-component.model';

@Component({
    selector: 'jhi-project-component-detail',
    templateUrl: './project-component-detail.component.html'
})
export class ProjectComponentDetailComponent implements OnInit {
    projectComponent: IProjectComponent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ projectComponent }) => {
            this.projectComponent = projectComponent;
        });
    }

    previousState() {
        window.history.back();
    }
}
