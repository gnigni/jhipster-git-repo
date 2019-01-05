import { NgModule } from '@angular/core';

import { JhipGitRepoSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipGitRepoSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipGitRepoSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipGitRepoSharedCommonModule {}
