import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipGitRepoApplicationModule } from './application/application.module';
import { JhipGitRepoProjectComponentModule } from './project-component/project-component.module';
import { JhipGitRepoGitRepoModule } from './git-repo/git-repo.module';
import { JhipGitRepoGitCommitModule } from './git-commit/git-commit.module';
import { JhipGitRepoGitCommitterModule } from './git-committer/git-committer.module';
import { JhipGitRepoSonarComponentModule } from './sonar-component/sonar-component.module';
import { JhipGitRepoJenkinsFolderModule } from './jenkins-folder/jenkins-folder.module';
import { JhipGitRepoJenkinsJobModule } from './jenkins-job/jenkins-job.module';
import { JhipGitRepoJenkinsJobBuildModule } from './jenkins-job-build/jenkins-job-build.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipGitRepoApplicationModule,
        JhipGitRepoProjectComponentModule,
        JhipGitRepoGitRepoModule,
        JhipGitRepoGitCommitModule,
        JhipGitRepoGitCommitterModule,
        JhipGitRepoSonarComponentModule,
        JhipGitRepoJenkinsFolderModule,
        JhipGitRepoJenkinsJobModule,
        JhipGitRepoJenkinsJobBuildModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipGitRepoEntityModule {}
