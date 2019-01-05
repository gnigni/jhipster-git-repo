import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJenkinsJob } from 'app/shared/model/jenkins-job.model';

type EntityResponseType = HttpResponse<IJenkinsJob>;
type EntityArrayResponseType = HttpResponse<IJenkinsJob[]>;

@Injectable({ providedIn: 'root' })
export class JenkinsJobService {
    public resourceUrl = SERVER_API_URL + 'api/jenkins-jobs';

    constructor(protected http: HttpClient) {}

    create(jenkinsJob: IJenkinsJob): Observable<EntityResponseType> {
        return this.http.post<IJenkinsJob>(this.resourceUrl, jenkinsJob, { observe: 'response' });
    }

    update(jenkinsJob: IJenkinsJob): Observable<EntityResponseType> {
        return this.http.put<IJenkinsJob>(this.resourceUrl, jenkinsJob, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJenkinsJob>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJenkinsJob[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
