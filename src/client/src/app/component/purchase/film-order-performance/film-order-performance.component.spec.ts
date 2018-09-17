/**
 * FilmOrderPerformanceComponent
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { AvailabilityPipe } from '../../../pipe/availability/availability.pipe';
import { DurationPipe } from '../../../pipe/duration/duration.pipe';
import { TimeFormatPipe } from '../../../pipe/time-format/time-format.pipe';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';
import { FilmOrderPerformanceComponent } from './film-order-performance.component';

describe('FilmOrderPerformanceComponent', () => {
    it('コンポーネント生成', async () => {
        const awsCognitoServiceStub = {
            credentials: {
                identityId: '123'
            }
        };
        await TestBed.configureTestingModule({
            declarations: [
                FilmOrderPerformanceComponent,
                DurationPipe,
                TimeFormatPipe,
                AvailabilityPipe
            ],
            providers: [
                { provide: AwsCognitoService, useValue: awsCognitoServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(FilmOrderPerformanceComponent);
        const component = fixture.componentInstance;
        const data: any = {
            startDate: moment().toDate(),
            endDate: moment().add(1, 'hours').toDate(),
            coaInfo: {
                dateJouei: moment().format('YYYYMMDD'),
                kbnService: {
                    kubunCode: '001'
                }
            },
            workPerformed: {
                duration: 'PT1H40M',
                identifier: '12345',
                name: 'テスト'
            },
            location: {
                name: { ja: 'テスト' }
            },
            offer: {
                availability: 100
            }
        };
        component.performance = data;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
