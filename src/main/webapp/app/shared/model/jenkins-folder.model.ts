import { IProjectComponent } from 'app/shared/model//project-component.model';

export interface IJenkinsFolder {
    id?: number;
    url?: string;
    component?: IProjectComponent;
}

export class JenkinsFolder implements IJenkinsFolder {
    constructor(public id?: number, public url?: string, public component?: IProjectComponent) {}
}
