import { IProjectComponent } from 'app/shared/model//project-component.model';

export interface IApplication {
    id?: number;
    codeApplication?: string;
    description?: string;
    components?: IProjectComponent[];
}

export class Application implements IApplication {
    constructor(
        public id?: number,
        public codeApplication?: string,
        public description?: string,
        public components?: IProjectComponent[]
    ) {}
}
