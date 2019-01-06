import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISonarComponent } from 'app/shared/model/sonar-component.model';

@Component({
    selector: 'jhi-sonar-component-detail',
    templateUrl: './sonar-component-detail.component.html'
})
export class SonarComponentDetailComponent implements OnInit {
    sonarComponent: ISonarComponent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sonarComponent }) => {
            this.sonarComponent = sonarComponent;
        });
    }

    previousState() {
        window.history.back();
    }
}
