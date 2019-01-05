import { IJenkinsJob } from 'app/shared/model//jenkins-job.model';

export const enum JenkinsJobBuildState {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
    WARN = 'WARN'
}

export interface IJenkinsJobBuild {
    id?: number;
    url?: string;
    state?: JenkinsJobBuildState;
    jenkinsJob?: IJenkinsJob;
}

export class JenkinsJobBuild implements IJenkinsJobBuild {
    constructor(public id?: number, public url?: string, public state?: JenkinsJobBuildState, public jenkinsJob?: IJenkinsJob) {}
}
