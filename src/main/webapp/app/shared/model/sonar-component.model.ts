import { IProjectComponent } from 'app/shared/model//project-component.model';

export const enum SonarQualifier {
    BRC = 'BRC',
    DIR = 'DIR',
    FIL = 'FIL',
    TRK = 'TRK',
    UTS = 'UTS'
}

export interface ISonarComponent {
    id?: number;
    organization?: string;
    componentId?: string;
    componentKey?: string;
    name?: string;
    description?: string;
    qualifier?: SonarQualifier;
    path?: string;
    component?: IProjectComponent;
}

export class SonarComponent implements ISonarComponent {
    constructor(
        public id?: number,
        public organization?: string,
        public componentId?: string,
        public componentKey?: string,
        public name?: string,
        public description?: string,
        public qualifier?: SonarQualifier,
        public path?: string,
        public component?: IProjectComponent
    ) {}
}
