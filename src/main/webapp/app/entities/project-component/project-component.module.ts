import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    ProjectComponentComponent,
    ProjectComponentDetailComponent,
    ProjectComponentUpdateComponent,
    ProjectComponentDeletePopupComponent,
    ProjectComponentDeleteDialogComponent,
    projectComponentRoute,
    projectComponentPopupRoute
} from './';

const ENTITY_STATES = [...projectComponentRoute, ...projectComponentPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProjectComponentComponent,
        ProjectComponentDetailComponent,
        ProjectComponentUpdateComponent,
        ProjectComponentDeleteDialogComponent,
        ProjectComponentDeletePopupComponent
    ],
    entryComponents: [
        ProjectComponentComponent,
        ProjectComponentUpdateComponent,
        ProjectComponentDeleteDialogComponent,
        ProjectComponentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoProjectComponentModule {}
