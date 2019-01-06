import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';

type EntityResponseType = HttpResponse<IJenkinsJobBuild>;
type EntityArrayResponseType = HttpResponse<IJenkinsJobBuild[]>;

@Injectable({ providedIn: 'root' })
export class JenkinsJobBuildService {
    public resourceUrl = SERVER_API_URL + 'api/jenkins-job-builds';

    constructor(protected http: HttpClient) {}

    create(jenkinsJobBuild: IJenkinsJobBuild): Observable<EntityResponseType> {
        return this.http.post<IJenkinsJobBuild>(this.resourceUrl, jenkinsJobBuild, { observe: 'response' });
    }

    update(jenkinsJobBuild: IJenkinsJobBuild): Observable<EntityResponseType> {
        return this.http.put<IJenkinsJobBuild>(this.resourceUrl, jenkinsJobBuild, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJenkinsJobBuild>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJenkinsJobBuild[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
