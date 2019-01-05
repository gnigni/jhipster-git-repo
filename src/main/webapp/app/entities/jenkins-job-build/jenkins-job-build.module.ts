import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    JenkinsJobBuildComponent,
    JenkinsJobBuildDetailComponent,
    JenkinsJobBuildUpdateComponent,
    JenkinsJobBuildDeletePopupComponent,
    JenkinsJobBuildDeleteDialogComponent,
    jenkinsJobBuildRoute,
    jenkinsJobBuildPopupRoute
} from './';

const ENTITY_STATES = [...jenkinsJobBuildRoute, ...jenkinsJobBuildPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JenkinsJobBuildComponent,
        JenkinsJobBuildDetailComponent,
        JenkinsJobBuildUpdateComponent,
        JenkinsJobBuildDeleteDialogComponent,
        JenkinsJobBuildDeletePopupComponent
    ],
    entryComponents: [
        JenkinsJobBuildComponent,
        JenkinsJobBuildUpdateComponent,
        JenkinsJobBuildDeleteDialogComponent,
        JenkinsJobBuildDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoJenkinsJobBuildModule {}
