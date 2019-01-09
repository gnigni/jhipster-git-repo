import { IApplication } from 'app/shared/model//application.model';
import { IProjectComponent } from 'app/shared/model//project-component.model';
import { IGitCommit } from 'app/shared/model//git-commit.model';

export interface IGitRepo {
    id?: number;
    localPath?: string;
    remoteUrl?: string;
    application?: IApplication;
    projectComponents?: IProjectComponent[];
    commits?: IGitCommit[];
}

export class GitRepo implements IGitRepo {
    constructor(
        public id?: number,
        public localPath?: string,
        public remoteUrl?: string,
        public application?: IApplication,
        public projectComponents?: IProjectComponent[],
        public commits?: IGitCommit[]
    ) {}
}
