import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    GitCommitComponent,
    GitCommitDetailComponent,
    GitCommitUpdateComponent,
    GitCommitDeletePopupComponent,
    GitCommitDeleteDialogComponent,
    gitCommitRoute,
    gitCommitPopupRoute
} from './';

const ENTITY_STATES = [...gitCommitRoute, ...gitCommitPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GitCommitComponent,
        GitCommitDetailComponent,
        GitCommitUpdateComponent,
        GitCommitDeleteDialogComponent,
        GitCommitDeletePopupComponent
    ],
    entryComponents: [GitCommitComponent, GitCommitUpdateComponent, GitCommitDeleteDialogComponent, GitCommitDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoGitCommitModule {}
