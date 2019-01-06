import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GitCommitter } from 'app/shared/model/git-committer.model';
import { GitCommitterService } from './git-committer.service';
import { GitCommitterComponent } from './git-committer.component';
import { GitCommitterDetailComponent } from './git-committer-detail.component';
import { GitCommitterUpdateComponent } from './git-committer-update.component';
import { GitCommitterDeletePopupComponent } from './git-committer-delete-dialog.component';
import { IGitCommitter } from 'app/shared/model/git-committer.model';

@Injectable({ providedIn: 'root' })
export class GitCommitterResolve implements Resolve<IGitCommitter> {
    constructor(private service: GitCommitterService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GitCommitter> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GitCommitter>) => response.ok),
                map((gitCommitter: HttpResponse<GitCommitter>) => gitCommitter.body)
            );
        }
        return of(new GitCommitter());
    }
}

export const gitCommitterRoute: Routes = [
    {
        path: 'git-committer',
        component: GitCommitterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommitters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-committer/:id/view',
        component: GitCommitterDetailComponent,
        resolve: {
            gitCommitter: GitCommitterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommitters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-committer/new',
        component: GitCommitterUpdateComponent,
        resolve: {
            gitCommitter: GitCommitterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommitters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-committer/:id/edit',
        component: GitCommitterUpdateComponent,
        resolve: {
            gitCommitter: GitCommitterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommitters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gitCommitterPopupRoute: Routes = [
    {
        path: 'git-committer/:id/delete',
        component: GitCommitterDeletePopupComponent,
        resolve: {
            gitCommitter: GitCommitterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommitters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
