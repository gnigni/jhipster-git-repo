/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { ProjectComponentComponent } from 'app/entities/project-component/project-component.component';
import { ProjectComponentService } from 'app/entities/project-component/project-component.service';
import { ProjectComponent } from 'app/shared/model/project-component.model';

describe('Component Tests', () => {
    describe('ProjectComponent Management Component', () => {
        let comp: ProjectComponentComponent;
        let fixture: ComponentFixture<ProjectComponentComponent>;
        let service: ProjectComponentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [ProjectComponentComponent],
                providers: []
            })
                .overrideTemplate(ProjectComponentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectComponentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectComponentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProjectComponent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.projectComponents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
