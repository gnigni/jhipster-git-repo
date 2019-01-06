import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GitCommit } from 'app/shared/model/git-commit.model';
import { GitCommitService } from './git-commit.service';
import { GitCommitComponent } from './git-commit.component';
import { GitCommitDetailComponent } from './git-commit-detail.component';
import { GitCommitUpdateComponent } from './git-commit-update.component';
import { GitCommitDeletePopupComponent } from './git-commit-delete-dialog.component';
import { IGitCommit } from 'app/shared/model/git-commit.model';

@Injectable({ providedIn: 'root' })
export class GitCommitResolve implements Resolve<IGitCommit> {
    constructor(private service: GitCommitService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GitCommit> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GitCommit>) => response.ok),
                map((gitCommit: HttpResponse<GitCommit>) => gitCommit.body)
            );
        }
        return of(new GitCommit());
    }
}

export const gitCommitRoute: Routes = [
    {
        path: 'git-commit',
        component: GitCommitComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-commit/:id/view',
        component: GitCommitDetailComponent,
        resolve: {
            gitCommit: GitCommitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-commit/new',
        component: GitCommitUpdateComponent,
        resolve: {
            gitCommit: GitCommitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommits'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-commit/:id/edit',
        component: GitCommitUpdateComponent,
        resolve: {
            gitCommit: GitCommitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gitCommitPopupRoute: Routes = [
    {
        path: 'git-commit/:id/delete',
        component: GitCommitDeletePopupComponent,
        resolve: {
            gitCommit: GitCommitResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitCommits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
