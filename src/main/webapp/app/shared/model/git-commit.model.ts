import { Moment } from 'moment';
import { IGitRepo } from 'app/shared/model//git-repo.model';
import { IGitCommit } from 'app/shared/model//git-commit.model';
import { IGitCommitter } from 'app/shared/model//git-committer.model';

export interface IGitCommit {
    id?: number;
    hash?: string;
    commitDate?: Moment;
    message?: string;
    branch?: string;
    gitRepo?: IGitRepo;
    parent?: IGitCommit;
    committer?: IGitCommitter;
}

export class GitCommit implements IGitCommit {
    constructor(
        public id?: number,
        public hash?: string,
        public commitDate?: Moment,
        public message?: string,
        public branch?: string,
        public gitRepo?: IGitRepo,
        public parent?: IGitCommit,
        public committer?: IGitCommitter
    ) {}
}
