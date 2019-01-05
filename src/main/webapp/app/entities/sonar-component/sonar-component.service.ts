import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISonarComponent } from 'app/shared/model/sonar-component.model';

type EntityResponseType = HttpResponse<ISonarComponent>;
type EntityArrayResponseType = HttpResponse<ISonarComponent[]>;

@Injectable({ providedIn: 'root' })
export class SonarComponentService {
    public resourceUrl = SERVER_API_URL + 'api/sonar-components';

    constructor(protected http: HttpClient) {}

    create(sonarComponent: ISonarComponent): Observable<EntityResponseType> {
        return this.http.post<ISonarComponent>(this.resourceUrl, sonarComponent, { observe: 'response' });
    }

    update(sonarComponent: ISonarComponent): Observable<EntityResponseType> {
        return this.http.put<ISonarComponent>(this.resourceUrl, sonarComponent, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISonarComponent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISonarComponent[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
