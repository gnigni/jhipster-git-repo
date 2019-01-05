import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISonarComponent } from 'app/shared/model/sonar-component.model';
import { SonarComponentService } from './sonar-component.service';
import { IProjectComponent } from 'app/shared/model/project-component.model';
import { ProjectComponentService } from 'app/entities/project-component';

@Component({
    selector: 'jhi-sonar-component-update',
    templateUrl: './sonar-component-update.component.html'
})
export class SonarComponentUpdateComponent implements OnInit {
    sonarComponent: ISonarComponent;
    isSaving: boolean;

    components: IProjectComponent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sonarComponentService: SonarComponentService,
        protected projectComponentService: ProjectComponentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sonarComponent }) => {
            this.sonarComponent = sonarComponent;
        });
        this.projectComponentService.query({ filter: 'sonarcomponent-is-null' }).subscribe(
            (res: HttpResponse<IProjectComponent[]>) => {
                if (!this.sonarComponent.component || !this.sonarComponent.component.id) {
                    this.components = res.body;
                } else {
                    this.projectComponentService.find(this.sonarComponent.component.id).subscribe(
                        (subRes: HttpResponse<IProjectComponent>) => {
                            this.components = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.sonarComponent.id !== undefined) {
            this.subscribeToSaveResponse(this.sonarComponentService.update(this.sonarComponent));
        } else {
            this.subscribeToSaveResponse(this.sonarComponentService.create(this.sonarComponent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISonarComponent>>) {
        result.subscribe((res: HttpResponse<ISonarComponent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectComponentById(index: number, item: IProjectComponent) {
        return item.id;
    }
}
