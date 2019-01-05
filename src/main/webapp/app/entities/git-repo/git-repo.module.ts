import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipGitRepoSharedModule } from 'app/shared';
import {
    GitRepoComponent,
    GitRepoDetailComponent,
    GitRepoUpdateComponent,
    GitRepoDeletePopupComponent,
    GitRepoDeleteDialogComponent,
    gitRepoRoute,
    gitRepoPopupRoute
} from './';

const ENTITY_STATES = [...gitRepoRoute, ...gitRepoPopupRoute];

@NgModule({
    imports: [JhipGitRepoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GitRepoComponent,
        GitRepoDetailComponent,
        GitRepoUpdateComponent,
        GitRepoDeleteDialogComponent,
        GitRepoDeletePopupComponent
    ],
    entryComponents: [GitRepoComponent, GitRepoUpdateComponent, GitRepoDeleteDialogComponent, GitRepoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoGitRepoModule {}
