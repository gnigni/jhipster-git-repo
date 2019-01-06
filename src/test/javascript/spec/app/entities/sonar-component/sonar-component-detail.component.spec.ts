/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipGitRepoTestModule } from '../../../test.module';
import { SonarComponentDetailComponent } from 'app/entities/sonar-component/sonar-component-detail.component';
import { SonarComponent } from 'app/shared/model/sonar-component.model';

describe('Component Tests', () => {
    describe('SonarComponent Management Detail Component', () => {
        let comp: SonarComponentDetailComponent;
        let fixture: ComponentFixture<SonarComponentDetailComponent>;
        const route = ({ data: of({ sonarComponent: new SonarComponent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipGitRepoTestModule],
                declarations: [SonarComponentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SonarComponentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SonarComponentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sonarComponent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
