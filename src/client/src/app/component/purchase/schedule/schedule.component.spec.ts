/**
 * ScheduleComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SwiperModule } from 'angular2-useful-swiper';
import * as moment from 'moment';
import { AvailabilityPipe } from '../../../pipe/availability/availability.pipe';
import { DurationPipe } from '../../../pipe/duration/duration.pipe';
import { TimeFormatPipe } from '../../../pipe/time-format/time-format.pipe';
import { ScheduleService } from '../../../service/schedule/schedule.service';
import { SelectService } from '../../../service/select/select.service';
import { LoadingComponent } from '../../loading/loading.component';
import { FilmOrderPerformanceComponent } from '../film-order-performance/film-order-performance.component';
import { FilmOrderComponent } from '../film-order/film-order.component';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {

    it('コンポーネント生成', async () => {
        const scheduleServiceStub = {
            data: {
                schedule: [],
                expired: moment().add(1, 'days').unix()
            },
            getSchedule: () => {
                return Promise.resolve();
            },
            getTheater: () => {
                return [
                    {
                        location: { branchCode: '123' },
                        name: { ja: 'TEST' }
                    }
                ];
            },
            getDate: () => {
                return [
                    {
                        value: '20171110',
                        displayText: 'TEST',
                        serviceDay: ''
                    }
                ];
            },
            getScreeningEvents: () => {
                return Promise.resolve([]);
            }
        };
        const selectServiceStub = {
            data: {
                purchase: {theater: '123', date: '20171110'}
            },
            getSelect: () => {
                return { purchase: {theater: '123', date: '20171110'} };
            },
            save: () => { }
        };
        await TestBed.configureTestingModule({
            declarations: [
                ScheduleComponent,
                FilmOrderComponent,
                FilmOrderPerformanceComponent,
                LoadingComponent,
                DurationPipe,
                TimeFormatPipe,
                AvailabilityPipe
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                ReactiveFormsModule,
                FormsModule
            ],
            providers: [
                { provide: SelectService, useValue: selectServiceStub },
                { provide: ScheduleService, useValue: scheduleServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(ScheduleComponent);
        const component = fixture.componentInstance;
        await component.ngOnInit();
        expect(component.isLoading).toBeFalsy();
    });
});
