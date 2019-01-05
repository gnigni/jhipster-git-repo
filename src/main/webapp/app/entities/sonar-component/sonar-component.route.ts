import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SonarComponent } from 'app/shared/model/sonar-component.model';
import { SonarComponentService } from './sonar-component.service';
import { SonarComponentComponent } from './sonar-component.component';
import { SonarComponentDetailComponent } from './sonar-component-detail.component';
import { SonarComponentUpdateComponent } from './sonar-component-update.component';
import { SonarComponentDeletePopupComponent } from './sonar-component-delete-dialog.component';
import { ISonarComponent } from 'app/shared/model/sonar-component.model';

@Injectable({ providedIn: 'root' })
export class SonarComponentResolve implements Resolve<ISonarComponent> {
    constructor(private service: SonarComponentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SonarComponent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SonarComponent>) => response.ok),
                map((sonarComponent: HttpResponse<SonarComponent>) => sonarComponent.body)
            );
        }
        return of(new SonarComponent());
    }
}

export const sonarComponentRoute: Routes = [
    {
        path: 'sonar-component',
        component: SonarComponentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sonar-component/:id/view',
        component: SonarComponentDetailComponent,
        resolve: {
            sonarComponent: SonarComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sonar-component/new',
        component: SonarComponentUpdateComponent,
        resolve: {
            sonarComponent: SonarComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sonar-component/:id/edit',
        component: SonarComponentUpdateComponent,
        resolve: {
            sonarComponent: SonarComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sonarComponentPopupRoute: Routes = [
    {
        path: 'sonar-component/:id/delete',
        component: SonarComponentDeletePopupComponent,
        resolve: {
            sonarComponent: SonarComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SonarComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
