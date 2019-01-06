import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GitRepo } from 'app/shared/model/git-repo.model';
import { GitRepoService } from './git-repo.service';
import { GitRepoComponent } from './git-repo.component';
import { GitRepoDetailComponent } from './git-repo-detail.component';
import { GitRepoUpdateComponent } from './git-repo-update.component';
import { GitRepoDeletePopupComponent } from './git-repo-delete-dialog.component';
import { IGitRepo } from 'app/shared/model/git-repo.model';

@Injectable({ providedIn: 'root' })
export class GitRepoResolve implements Resolve<IGitRepo> {
    constructor(private service: GitRepoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GitRepo> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GitRepo>) => response.ok),
                map((gitRepo: HttpResponse<GitRepo>) => gitRepo.body)
            );
        }
        return of(new GitRepo());
    }
}

export const gitRepoRoute: Routes = [
    {
        path: 'git-repo',
        component: GitRepoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-repo/:id/view',
        component: GitRepoDetailComponent,
        resolve: {
            gitRepo: GitRepoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-repo/new',
        component: GitRepoUpdateComponent,
        resolve: {
            gitRepo: GitRepoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'git-repo/:id/edit',
        component: GitRepoUpdateComponent,
        resolve: {
            gitRepo: GitRepoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gitRepoPopupRoute: Routes = [
    {
        path: 'git-repo/:id/delete',
        component: GitRepoDeletePopupComponent,
        resolve: {
            gitRepo: GitRepoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GitRepos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
