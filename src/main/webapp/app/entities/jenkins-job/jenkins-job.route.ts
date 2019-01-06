import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JenkinsJob } from 'app/shared/model/jenkins-job.model';
import { JenkinsJobService } from './jenkins-job.service';
import { JenkinsJobComponent } from './jenkins-job.component';
import { JenkinsJobDetailComponent } from './jenkins-job-detail.component';
import { JenkinsJobUpdateComponent } from './jenkins-job-update.component';
import { JenkinsJobDeletePopupComponent } from './jenkins-job-delete-dialog.component';
import { IJenkinsJob } from 'app/shared/model/jenkins-job.model';

@Injectable({ providedIn: 'root' })
export class JenkinsJobResolve implements Resolve<IJenkinsJob> {
    constructor(private service: JenkinsJobService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JenkinsJob> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JenkinsJob>) => response.ok),
                map((jenkinsJob: HttpResponse<JenkinsJob>) => jenkinsJob.body)
            );
        }
        return of(new JenkinsJob());
    }
}

export const jenkinsJobRoute: Routes = [
    {
        path: 'jenkins-job',
        component: JenkinsJobComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-job/:id/view',
        component: JenkinsJobDetailComponent,
        resolve: {
            jenkinsJob: JenkinsJobResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-job/new',
        component: JenkinsJobUpdateComponent,
        resolve: {
            jenkinsJob: JenkinsJobResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-job/:id/edit',
        component: JenkinsJobUpdateComponent,
        resolve: {
            jenkinsJob: JenkinsJobResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jenkinsJobPopupRoute: Routes = [
    {
        path: 'jenkins-job/:id/delete',
        component: JenkinsJobDeletePopupComponent,
        resolve: {
            jenkinsJob: JenkinsJobResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsJobs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
