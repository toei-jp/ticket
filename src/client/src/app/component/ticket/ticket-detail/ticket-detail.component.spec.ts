/**
 * TicketDetailComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { TicketDetailComponent } from './ticket-detail.component';

describe('TicketDetailComponent', () => {
    let component: TicketDetailComponent;
    let fixture: ComponentFixture<TicketDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TicketDetailComponent
            ],
            imports: []
        })
            .compileComponents();
    }));

    it('コンポーネント生成', () => {
        fixture = TestBed.createComponent(TicketDetailComponent);
        component = fixture.componentInstance;
        const reservation: any = {
            confirmationNumber: '12345678',
            acceptedOffers: [
                {
                    itemOffered: {
                        reservedTicket: {
                            ticketedSeat: { seatNumber: 'A-1' },
                            coaTicketInfo: { ticketName: 'TEST' },
                            ticketToken: '12345678'
                        },
                        reservationFor: {
                            workPerformed: { name: 'TEST' },
                            coaInfo: { dateJouei: moment().format('YYYYMMDD') },
                            startDate: moment().toDate(),
                            endDate: moment().add(1, 'hour').toDate(),
                            superEvent: {
                                location: {
                                    name: { ja: 'TEST' }
                                }
                            },
                            location: {
                                name: { ja: 'TEST' }
                            }
                        }
                    }
                }
            ]
        };
        component.reservation = reservation;
        component.offer = reservation.acceptedOffers[0];
        component.index = 0;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
