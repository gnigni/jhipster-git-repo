/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipGitRepoTestModule } from '../../../test.module';
import { SonarComponentComponent } from 'app/entities/sonar-component/sonar-component.component';
import { SonarComponentService } from 'app/entities/sonar-component/sonar-component.service';
import { SonarComponent } from 'app/shared/model/sonar-component.model';

describe('Component Tests', () => {
    describe('SonarComponent Management Component', () => {
        let comp: SonarComponentComponent;
        let fixture: ComponentFixture<SonarComponentComponent>;
        let service: SonarComponentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [SonarComponentComponent],
                providers: []
            })
                .overrideTemplate(SonarComponentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SonarComponentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SonarComponentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SonarComponent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sonarComponents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
