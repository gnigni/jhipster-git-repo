import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProjectComponent } from 'app/shared/model/project-component.model';

type EntityResponseType = HttpResponse<IProjectComponent>;
type EntityArrayResponseType = HttpResponse<IProjectComponent[]>;

@Injectable({ providedIn: 'root' })
export class ProjectComponentService {
    public resourceUrl = SERVER_API_URL + 'api/project-components';

    constructor(protected http: HttpClient) {}

    create(projectComponent: IProjectComponent): Observable<EntityResponseType> {
        return this.http.post<IProjectComponent>(this.resourceUrl, projectComponent, { observe: 'response' });
    }

    update(projectComponent: IProjectComponent): Observable<EntityResponseType> {
        return this.http.put<IProjectComponent>(this.resourceUrl, projectComponent, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProjectComponent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProjectComponent[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
