import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    GitCommitterComponent,
    GitCommitterDetailComponent,
    GitCommitterUpdateComponent,
    GitCommitterDeletePopupComponent,
    GitCommitterDeleteDialogComponent,
    gitCommitterRoute,
    gitCommitterPopupRoute
} from './';

const ENTITY_STATES = [...gitCommitterRoute, ...gitCommitterPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GitCommitterComponent,
        GitCommitterDetailComponent,
        GitCommitterUpdateComponent,
        GitCommitterDeleteDialogComponent,
        GitCommitterDeletePopupComponent
    ],
    entryComponents: [
        GitCommitterComponent,
        GitCommitterUpdateComponent,
        GitCommitterDeleteDialogComponent,
        GitCommitterDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoGitCommitterModule {}
