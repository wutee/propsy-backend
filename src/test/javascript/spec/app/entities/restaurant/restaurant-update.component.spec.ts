/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PropsyBackendSampleTestModule } from '../../../test.module';
import { RestaurantUpdateComponent } from 'app/entities/restaurant/restaurant-update.component';
import { RestaurantService } from 'app/entities/restaurant/restaurant.service';
import { Restaurant } from 'app/shared/model/restaurant.model';

describe('Component Tests', () => {
    describe('Restaurant Management Update Component', () => {
        let comp: RestaurantUpdateComponent;
        let fixture: ComponentFixture<RestaurantUpdateComponent>;
        let service: RestaurantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PropsyBackendSampleTestModule],
                declarations: [RestaurantUpdateComponent]
            })
                .overrideTemplate(RestaurantUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RestaurantUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestaurantService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Restaurant(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.restaurant = entity;
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
                    const entity = new Restaurant();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.restaurant = entity;
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
