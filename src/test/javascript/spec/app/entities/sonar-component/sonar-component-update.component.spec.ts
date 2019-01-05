/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { SonarComponentUpdateComponent } from 'app/entities/sonar-component/sonar-component-update.component';
import { SonarComponentService } from 'app/entities/sonar-component/sonar-component.service';
import { SonarComponent } from 'app/shared/model/sonar-component.model';

describe('Component Tests', () => {
    describe('SonarComponent Management Update Component', () => {
        let comp: SonarComponentUpdateComponent;
        let fixture: ComponentFixture<SonarComponentUpdateComponent>;
        let service: SonarComponentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [SonarComponentUpdateComponent]
            })
                .overrideTemplate(SonarComponentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SonarComponentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SonarComponentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SonarComponent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sonarComponent = entity;
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
                    const entity = new SonarComponent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sonarComponent = entity;
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
