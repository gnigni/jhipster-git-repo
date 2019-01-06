import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGitRepo } from 'app/shared/model/git-repo.model';

type EntityResponseType = HttpResponse<IGitRepo>;
type EntityArrayResponseType = HttpResponse<IGitRepo[]>;

@Injectable({ providedIn: 'root' })
export class GitRepoService {
    public resourceUrl = SERVER_API_URL + 'api/git-repos';

    constructor(protected http: HttpClient) {}

    create(gitRepo: IGitRepo): Observable<EntityResponseType> {
        return this.http.post<IGitRepo>(this.resourceUrl, gitRepo, { observe: 'response' });
    }

    update(gitRepo: IGitRepo): Observable<EntityResponseType> {
        return this.http.put<IGitRepo>(this.resourceUrl, gitRepo, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGitRepo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGitRepo[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
