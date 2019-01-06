/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { ProjectComponentDetailComponent } from 'app/entities/project-component/project-component-detail.component';
import { ProjectComponent } from 'app/shared/model/project-component.model';

describe('Component Tests', () => {
    describe('ProjectComponent Management Detail Component', () => {
        let comp: ProjectComponentDetailComponent;
        let fixture: ComponentFixture<ProjectComponentDetailComponent>;
        const route = ({ data: of({ projectComponent: new ProjectComponent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [ProjectComponentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProjectComponentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectComponentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.projectComponent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
