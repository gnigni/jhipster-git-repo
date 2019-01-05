import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';
import { JenkinsJobBuildService } from './jenkins-job-build.service';
import { JenkinsJobBuildComponent } from './jenkins-job-build.component';
import { JenkinsJobBuildDetailComponent } from './jenkins-job-build-detail.component';
import { JenkinsJobBuildUpdateComponent } from './jenkins-job-build-update.component';
import { JenkinsJobBuildDeletePopupComponent } from './jenkins-job-build-delete-dialog.component';
import { IJenkinsJobBuild } from 'app/shared/model/jenkins-job-build.model';

@Injectable({ providedIn: 'root' })
export class JenkinsJobBuildResolve implements Resolve<IJenkinsJobBuild> {
    constructor(private service: JenkinsJobBuildService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JenkinsJobBuild> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JenkinsJobBuild>) => response.ok),
                map((jenkinsJobBuild: HttpResponse<JenkinsJobBuild>) => jenkinsJobBuild.body)
            );
        }
        return of(new JenkinsJobBuild());
    }
}

export const jenkinsJobBuildRoute: Routes = [
    {
        path: 'jenkins-job-build',
        component: JenkinsJobBuildComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-job-build/:id/view',
        component: JenkinsJobBuildDetailComponent,
        resolve: {
            jenkinsJobBuild: JenkinsJobBuildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-job-build/new',
        component: JenkinsJobBuildUpdateComponent,
        resolve: {
            jenkinsJobBuild: JenkinsJobBuildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-job-build/:id/edit',
        component: JenkinsJobBuildUpdateComponent,
        resolve: {
            jenkinsJobBuild: JenkinsJobBuildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jenkinsJobBuildPopupRoute: Routes = [
    {
        path: 'jenkins-job-build/:id/delete',
        component: JenkinsJobBuildDeletePopupComponent,
        resolve: {
            jenkinsJobBuild: JenkinsJobBuildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobBuilds'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
