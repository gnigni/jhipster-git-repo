import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    SonarComponentComponent,
    SonarComponentDetailComponent,
    SonarComponentUpdateComponent,
    SonarComponentDeletePopupComponent,
    SonarComponentDeleteDialogComponent,
    sonarComponentRoute,
    sonarComponentPopupRoute
} from './';

const ENTITY_STATES = [...sonarComponentRoute, ...sonarComponentPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SonarComponentComponent,
        SonarComponentDetailComponent,
        SonarComponentUpdateComponent,
        SonarComponentDeleteDialogComponent,
        SonarComponentDeletePopupComponent
    ],
    entryComponents: [
        SonarComponentComponent,
        SonarComponentUpdateComponent,
        SonarComponentDeleteDialogComponent,
        SonarComponentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoSonarComponentModule {}
