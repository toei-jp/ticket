/**
 * ReservationService
 */
import { inject, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
    it('getReservation Cognito経由で取得', async () => {
        const awsCognitoServiceStub: any = {
            getRecords: () => {
                return Promise.resolve({});
            }
        };
        const storageServiceStub: any = {
            load: () => {
                return null;
            },
            save: () => { }
        };
        const service = new ReservationService(awsCognitoServiceStub, storageServiceStub);
        const reservation = await service.getReservation();
        expect(reservation.expired);
        expect(Array.isArray(reservation.reservations)).toBeTruthy();
    });

    it('getReservation ストレージから取得', async () => {
        const awsCognitoServiceStub: any = {
            getRecords: () => {
                return Promise.resolve({});
            }
        };
        const storageServiceStub: any = {
            load: () => {
                return {
                    reservations: [],
                    expired: moment().add(1, 'days').unix()
                };
            },
            save: () => { }
        };
        const service = new ReservationService(awsCognitoServiceStub, storageServiceStub);
        const reservation = await service.getReservation();
        expect(reservation.expired);
        expect(Array.isArray(reservation.reservations)).toBeTruthy();
    });

    it('getReservation Cognito経由で取得失敗', async () => {
        const awsCognitoServiceStub: any = {
            getRecords: () => {
                return Promise.reject(new Error('Cognito経由で取得失敗'));
            }
        };
        const storageServiceStub: any = {
            load: () => {
                return null;
            },
            save: () => { },
            remove: () => { }
        };
        const service = new ReservationService(awsCognitoServiceStub, storageServiceStub);
        try {
            const reservation = await service.getReservation();
        } catch (err) {
            expect(err.message);
        }
    });

    it('getReservationByPurchaseNumberOrder', async () => {
        const awsCognitoServiceStub: any = {};
        const storageServiceStub: any = {};
        const service = new ReservationService(awsCognitoServiceStub, storageServiceStub);
        const data: any = {
            reservations: [
                {
                    acceptedOffers: []
                },
                {
                    acceptedOffers: [
                        {
                            itemOffered: {
                                reservationFor: {
                                    endDate: moment().add(1, 'days').toDate()
                                }
                            }
                        }
                    ]
                },
                {
                    acceptedOffers: [
                        {
                            itemOffered: {
                                reservationFor: {
                                    endDate: moment().subtract(1, 'days').toDate()
                                }
                            }
                        }
                    ]
                }
            ],
            expired: moment().add(1, 'days').unix()
        };
        service.data = data;
        const reservation = await service.getReservationByPurchaseNumberOrder();
        expect(reservation.length).toEqual(1);
    });
});
