import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    ApplicationComponent,
    ApplicationDetailComponent,
    ApplicationUpdateComponent,
    ApplicationDeletePopupComponent,
    ApplicationDeleteDialogComponent,
    applicationRoute,
    applicationPopupRoute
} from './';

const ENTITY_STATES = [...applicationRoute, ...applicationPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicationComponent,
        ApplicationDetailComponent,
        ApplicationUpdateComponent,
        ApplicationDeleteDialogComponent,
        ApplicationDeletePopupComponent
    ],
    entryComponents: [ApplicationComponent, ApplicationUpdateComponent, ApplicationDeleteDialogComponent, ApplicationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoApplicationModule {}
