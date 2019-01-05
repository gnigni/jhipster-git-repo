/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { ProjectComponentUpdateComponent } from 'app/entities/project-component/project-component-update.component';
import { ProjectComponentService } from 'app/entities/project-component/project-component.service';
import { ProjectComponent } from 'app/shared/model/project-component.model';

describe('Component Tests', () => {
    describe('ProjectComponent Management Update Component', () => {
        let comp: ProjectComponentUpdateComponent;
        let fixture: ComponentFixture<ProjectComponentUpdateComponent>;
        let service: ProjectComponentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [ProjectComponentUpdateComponent]
            })
                .overrideTemplate(ProjectComponentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectComponentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectComponentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProjectComponent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.projectComponent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProjectComponent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.projectComponent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
