/**
 * TicketHolderComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'angular2-useful-swiper';
import { TimeFormatPipe } from '../../../pipe/time-format/time-format.pipe';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';
import { ReservationService } from '../../../service/reservation/reservation.service';
import { LoadingComponent } from '../../loading/loading.component';
import { NoTicketComponent } from '../no-ticket/no-ticket.component';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketHolderComponent } from './ticket-holder.component';

describe('TicketHolderComponent', () => {

    it('コンポーネント生成', async () => {
        const reservationServiceStub = {
            getReservation: () => {
                return Promise.resolve();
            },
            getReservationByPurchaseNumberOrder: () => {
                return [];
            }
        };
        await TestBed.configureTestingModule({
            declarations: [
                TicketHolderComponent,
                TicketComponent,
                TicketDetailComponent,
                NoTicketComponent,
                LoadingComponent,
                TimeFormatPipe
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                SwiperModule,
                MomentModule
            ],
            providers: [
                { provide: ReservationService, useValue: reservationServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(TicketHolderComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.ngOnInit();
        expect(component.isLoading).toBeFalsy();
    });
});
