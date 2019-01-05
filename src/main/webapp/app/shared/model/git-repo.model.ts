import { IProjectComponent } from 'app/shared/model//project-component.model';
import { IGitCommit } from 'app/shared/model//git-commit.model';

export interface IGitRepo {
    id?: number;
    localPath?: string;
    remoteUrl?: string;
    components?: IProjectComponent[];
    commits?: IGitCommit[];
}

export class GitRepo implements IGitRepo {
    constructor(
        public id?: number,
        public localPath?: string,
        public remoteUrl?: string,
        public components?: IProjectComponent[],
        public commits?: IGitCommit[]
    ) {}
}
