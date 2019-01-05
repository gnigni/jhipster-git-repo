import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGitCommit } from 'app/shared/model/git-commit.model';

type EntityResponseType = HttpResponse<IGitCommit>;
type EntityArrayResponseType = HttpResponse<IGitCommit[]>;

@Injectable({ providedIn: 'root' })
export class GitCommitService {
    public resourceUrl = SERVER_API_URL + 'api/git-commits';

    constructor(protected http: HttpClient) {}

    create(gitCommit: IGitCommit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gitCommit);
        return this.http
            .post<IGitCommit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gitCommit: IGitCommit): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gitCommit);
        return this.http
            .put<IGitCommit>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGitCommit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGitCommit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gitCommit: IGitCommit): IGitCommit {
        const copy: IGitCommit = Object.assign({}, gitCommit, {
            commitDate: gitCommit.commitDate != null && gitCommit.commitDate.isValid() ? gitCommit.commitDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.commitDate = res.body.commitDate != null ? moment(res.body.commitDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gitCommit: IGitCommit) => {
                gitCommit.commitDate = gitCommit.commitDate != null ? moment(gitCommit.commitDate) : null;
            });
        }
        return res;
    }
}
