import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJenkinsFolder } from 'app/shared/model/jenkins-folder.model';

type EntityResponseType = HttpResponse<IJenkinsFolder>;
type EntityArrayResponseType = HttpResponse<IJenkinsFolder[]>;

@Injectable({ providedIn: 'root' })
export class JenkinsFolderService {
    public resourceUrl = SERVER_API_URL + 'api/jenkins-folders';

    constructor(protected http: HttpClient) {}

    create(jenkinsFolder: IJenkinsFolder): Observable<EntityResponseType> {
        return this.http.post<IJenkinsFolder>(this.resourceUrl, jenkinsFolder, { observe: 'response' });
    }

    update(jenkinsFolder: IJenkinsFolder): Observable<EntityResponseType> {
        return this.http.put<IJenkinsFolder>(this.resourceUrl, jenkinsFolder, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJenkinsFolder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJenkinsFolder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
