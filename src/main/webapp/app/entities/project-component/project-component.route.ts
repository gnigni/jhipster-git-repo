import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProjectComponent } from 'app/shared/model/project-component.model';
import { ProjectComponentService } from './project-component.service';
import { ProjectComponentComponent } from './project-component.component';
import { ProjectComponentDetailComponent } from './project-component-detail.component';
import { ProjectComponentUpdateComponent } from './project-component-update.component';
import { ProjectComponentDeletePopupComponent } from './project-component-delete-dialog.component';
import { IProjectComponent } from 'app/shared/model/project-component.model';

@Injectable({ providedIn: 'root' })
export class ProjectComponentResolve implements Resolve<IProjectComponent> {
    constructor(private service: ProjectComponentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectComponent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ProjectComponent>) => response.ok),
                map((projectComponent: HttpResponse<ProjectComponent>) => projectComponent.body)
            );
        }
        return of(new ProjectComponent());
    }
}

export const projectComponentRoute: Routes = [
    {
        path: 'project-component',
        component: ProjectComponentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectComponents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-component/:id/view',
        component: ProjectComponentDetailComponent,
        resolve: {
            projectComponent: ProjectComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectComponents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-component/new',
        component: ProjectComponentUpdateComponent,
        resolve: {
            projectComponent: ProjectComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectComponents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-component/:id/edit',
        component: ProjectComponentUpdateComponent,
        resolve: {
            projectComponent: ProjectComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectComponents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectComponentPopupRoute: Routes = [
    {
        path: 'project-component/:id/delete',
        component: ProjectComponentDeletePopupComponent,
        resolve: {
            projectComponent: ProjectComponentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectComponents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
