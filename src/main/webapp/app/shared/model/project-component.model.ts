import { IApplication } from 'app/shared/model//application.model';
import { IProjectComponent } from 'app/shared/model//project-component.model';
import { IGitRepo } from 'app/shared/model//git-repo.model';

export const enum ComponentType {
    POM = 'POM',
    JAR = 'JAR',
    WAR = 'WAR',
    BATCH = 'BATCH',
    IHM = 'IHM'
}

export interface IProjectComponent {
    id?: number;
    type?: ComponentType;
    application?: IApplication;
    parent?: IProjectComponent;
    gitRepo?: IGitRepo;
}

export class ProjectComponent implements IProjectComponent {
    constructor(
        public id?: number,
        public type?: ComponentType,
        public application?: IApplication,
        public parent?: IProjectComponent,
        public gitRepo?: IGitRepo
    ) {}
}
