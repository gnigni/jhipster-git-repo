import { IProjectComponent } from 'app/shared/model//project-component.model';
import { IGitRepo } from 'app/shared/model//git-repo.model';

export interface IApplication {
    id?: number;
    codeApplication?: string;
    description?: string;
    components?: IProjectComponent[];
    gitRepos?: IGitRepo[];
}

export class Application implements IApplication {
    constructor(
        public id?: number,
        public codeApplication?: string,
        public description?: string,
        public components?: IProjectComponent[],
        public gitRepos?: IGitRepo[]
    ) {}
}
