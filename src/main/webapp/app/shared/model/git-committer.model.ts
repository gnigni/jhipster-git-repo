export interface IGitCommitter {
    id?: number;
    name?: string;
}

export class GitCommitter implements IGitCommitter {
    constructor(public id?: number, public name?: string) {}
}
