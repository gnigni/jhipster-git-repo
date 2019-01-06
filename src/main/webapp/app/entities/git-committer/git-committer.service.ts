import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGitCommitter } from 'app/shared/model/git-committer.model';

type EntityResponseType = HttpResponse<IGitCommitter>;
type EntityArrayResponseType = HttpResponse<IGitCommitter[]>;

@Injectable({ providedIn: 'root' })
export class GitCommitterService {
    public resourceUrl = SERVER_API_URL + 'api/git-committers';

    constructor(protected http: HttpClient) {}

    create(gitCommitter: IGitCommitter): Observable<EntityResponseType> {
        return this.http.post<IGitCommitter>(this.resourceUrl, gitCommitter, { observe: 'response' });
    }

    update(gitCommitter: IGitCommitter): Observable<EntityResponseType> {
        return this.http.put<IGitCommitter>(this.resourceUrl, gitCommitter, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGitCommitter>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGitCommitter[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
