import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JenkinsFolder } from 'app/shared/model/jenkins-folder.model';
import { JenkinsFolderService } from './jenkins-folder.service';
import { JenkinsFolderComponent } from './jenkins-folder.component';
import { JenkinsFolderDetailComponent } from './jenkins-folder-detail.component';
import { JenkinsFolderUpdateComponent } from './jenkins-folder-update.component';
import { JenkinsFolderDeletePopupComponent } from './jenkins-folder-delete-dialog.component';
import { IJenkinsFolder } from 'app/shared/model/jenkins-folder.model';

@Injectable({ providedIn: 'root' })
export class JenkinsFolderResolve implements Resolve<IJenkinsFolder> {
    constructor(private service: JenkinsFolderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JenkinsFolder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<JenkinsFolder>) => response.ok),
                map((jenkinsFolder: HttpResponse<JenkinsFolder>) => jenkinsFolder.body)
            );
        }
        return of(new JenkinsFolder());
    }
}

export const jenkinsFolderRoute: Routes = [
    {
        path: 'jenkins-folder',
        component: JenkinsFolderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-folder/:id/view',
        component: JenkinsFolderDetailComponent,
        resolve: {
            jenkinsFolder: JenkinsFolderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-folder/new',
        component: JenkinsFolderUpdateComponent,
        resolve: {
            jenkinsFolder: JenkinsFolderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'jenkins-folder/:id/edit',
        component: JenkinsFolderUpdateComponent,
        resolve: {
            jenkinsFolder: JenkinsFolderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jenkinsFolderPopupRoute: Routes = [
    {
        path: 'jenkins-folder/:id/delete',
        component: JenkinsFolderDeletePopupComponent,
        resolve: {
            jenkinsFolder: JenkinsFolderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'JenkinsFolders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
