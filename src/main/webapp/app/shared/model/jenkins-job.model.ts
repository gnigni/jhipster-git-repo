import { IJenkinsFolder } from 'app/shared/model//jenkins-folder.model';

export const enum JenkinsJobType {
    INT_BUILD = 'INT_BUILD',
    INT_DEPLOY = 'INT_DEPLOY',
    INT_SONAR = 'INT_SONAR',
    REC_BUILD = 'REC_BUILD',
    REC_RELEASE = 'REC_RELEASE'
}

export interface IJenkinsJob {
    id?: number;
    url?: string;
    type?: JenkinsJobType;
    jenkinsFolder?: IJenkinsFolder;
}

export class JenkinsJob implements IJenkinsJob {
    constructor(public id?: number, public url?: string, public type?: JenkinsJobType, public jenkinsFolder?: IJenkinsFolder) {}
}
