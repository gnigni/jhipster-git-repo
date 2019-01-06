import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    JenkinsJobComponent,
    JenkinsJobDetailComponent,
    JenkinsJobUpdateComponent,
    JenkinsJobDeletePopupComponent,
    JenkinsJobDeleteDialogComponent,
    jenkinsJobRoute,
    jenkinsJobPopupRoute
} from './';

const ENTITY_STATES = [...jenkinsJobRoute, ...jenkinsJobPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JenkinsJobComponent,
        JenkinsJobDetailComponent,
        JenkinsJobUpdateComponent,
        JenkinsJobDeleteDialogComponent,
        JenkinsJobDeletePopupComponent
    ],
    entryComponents: [JenkinsJobComponent, JenkinsJobUpdateComponent, JenkinsJobDeleteDialogComponent, JenkinsJobDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoJenkinsJobModule {}
