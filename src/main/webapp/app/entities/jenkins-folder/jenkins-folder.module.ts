import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    JenkinsFolderComponent,
    JenkinsFolderDetailComponent,
    JenkinsFolderUpdateComponent,
    JenkinsFolderDeletePopupComponent,
    JenkinsFolderDeleteDialogComponent,
    jenkinsFolderRoute,
    jenkinsFolderPopupRoute
} from './';

const ENTITY_STATES = [...jenkinsFolderRoute, ...jenkinsFolderPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JenkinsFolderComponent,
        JenkinsFolderDetailComponent,
        JenkinsFolderUpdateComponent,
        JenkinsFolderDeleteDialogComponent,
        JenkinsFolderDeletePopupComponent
    ],
    entryComponents: [
        JenkinsFolderComponent,
        JenkinsFolderUpdateComponent,
        JenkinsFolderDeleteDialogComponent,
        JenkinsFolderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoJenkinsFolderModule {}
