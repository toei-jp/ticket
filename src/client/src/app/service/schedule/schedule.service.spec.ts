/**
 * ScheduleServiceテスト
 */
import { inject, TestBed } from '@angular/core/testing';
import * as httpStatus from 'http-status';
import * as moment from 'moment';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
    it('getSchedule API経由で取得', async () => {
        const httpStub: any = {
            get: () => {
                return {
                    retry: () => {
                        return {
                            toPromise: () => {
                                return Promise.resolve({
                                    result: {
                                        theaters: [],
                                        screeningEvents: []
                                    }
                                });
                            }
                        };
                    }
                };
            }
        };
        const storageServiceStub: any = {
            load: () => {
                return null;
            },
            save: () => { },
            remove: () => { }
        };
        const service = new ScheduleService(httpStub, storageServiceStub);
        const schedule = await service.getSchedule();
        expect(schedule.expired);
        expect(Array.isArray(schedule.schedule)).toBeTruthy();
    });

    it('getSchedule API経由で取得失敗', async () => {
        const httpStub: any = {
            get: () => {
                return {
                    retry: () => {
                        return {
                            toPromise: () => {
                                return Promise.reject({ error: 'API経由で取得失敗' });
                            }
                        };
                    }
                };
            }
        };
        const storageServiceStub: any = {
            load: () => {
                return null;
            },
            save: () => { },
            remove: () => { }
        };
        const service = new ScheduleService(httpStub, storageServiceStub);
        try {
            const schedule = await service.getSchedule();
        } catch (err) {
            expect(err.message);
        }
    });

    it('getSchedule ストレージから取得', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {
            load: () => {
                return {
                    schedule: [],
                    expired: moment().add(1, 'days').unix()
                };
            },
            save: () => { },
            remove: () => { }
        };
        const service = new ScheduleService(httpStub, storageServiceStub);
        const schedule = await service.getSchedule();
        expect(schedule.expired);
        expect(Array.isArray(schedule.schedule)).toBeTruthy();
    });

    it('getSchedule memberから取得', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {
            load: () => { },
            save: () => { },
            remove: () => { }
        };
        const service = new ScheduleService(httpStub, storageServiceStub);
        const data: any = {
            schedule: [],
            expired: moment().add(1, 'days').unix()
        };
        service.data = data;
        const schedule = await service.getSchedule();
        expect(schedule.expired);
        expect(Array.isArray(schedule.schedule)).toBeTruthy();
    });

    it('getTheater', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {};
        const service = new ScheduleService(httpStub, storageServiceStub);
        const data: any = {
            schedule: [{ theater: {} }],
            expired: moment().add(1, 'days').unix()
        };
        service.data = data;
        const theater = service.getTheater();
        expect(Array.isArray(theater)).toBeTruthy();
    });

    it('getTheater 失敗', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {};
        const service = new ScheduleService(httpStub, storageServiceStub);
        const data: any = undefined;
        service.data = data;
        try {
            const theater = service.getTheater();
        } catch (err) {
            expect(err.message);
        }
    });

    it('getDate', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {};
        const service = new ScheduleService(httpStub, storageServiceStub);
        const data: any = {
            schedule: [
                {
                    theater: {
                        location: { branchCode: '123' }
                    },
                    schedule: [
                        {
                            individualScreeningEvents: [
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '0',
                                        nameServiceDay: ''
                                    }
                                }
                            ]
                        },
                        {
                            individualScreeningEvents: [
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '0',
                                        nameServiceDay: ''
                                    }
                                }
                            ]
                        },
                        {
                            individualScreeningEvents: [
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '0',
                                        nameServiceDay: ''
                                    }
                                }
                            ]
                        },
                        {
                            individualScreeningEvents: [
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().add(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '1',
                                        nameServiceDay: ''
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            expired: moment().add(1, 'days').unix()
        };
        service.data = data;
        const dateList = service.getDate('123');
        expect(Array.isArray(dateList)).toBeTruthy();
    });

    it('getDate 失敗', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {};
        const service = new ScheduleService(httpStub, storageServiceStub);
        const data: any = undefined;
        service.data = data;
        try {
            const dateList = service.getDate('123');
        } catch (err) {
            expect(err.message);
        }
    });

    it('getScreeningEvents', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {};
        const service = new ScheduleService(httpStub, storageServiceStub);
        const data: any = {
            schedule: [
                {
                    theater: {
                        location: { branchCode: '123' }
                    },
                    schedule: [
                        {
                            date: moment().format('YYYYMMDD'),
                            individualScreeningEvents: [
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '0',
                                        nameServiceDay: ''
                                    },
                                    workPerformed: {
                                        identifier: '123'
                                    },
                                    startDate: moment().add(1, 'days').toDate()
                                },
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '0',
                                        nameServiceDay: ''
                                    },
                                    workPerformed: {
                                        identifier: '123'
                                    },
                                    startDate: moment().add(1, 'days').toDate()
                                },
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '0',
                                        nameServiceDay: ''
                                    },
                                    workPerformed: {
                                        identifier: '123'
                                    },
                                    startDate: moment().subtract(1, 'days').toDate()
                                }
                            ]
                        },
                        {
                            date: moment().add(1, 'days').format('YYYYMMDD'),
                            individualScreeningEvents: [
                                {
                                    coaInfo: {
                                        rsvStartDate: moment().subtract(1, 'days').format('YYYYMMDD'),
                                        flgEarlyBooking: '0',
                                        nameServiceDay: ''
                                    },
                                    workPerformed: {
                                        identifier: '123'
                                    },
                                    startDate: moment().subtract(1, 'days').toDate()
                                }
                            ]
                        }
                    ]
                }
            ],
            expired: moment().add(1, 'days').unix()
        };
        service.data = data;
        const screeningEvents = await service.getScreeningEvents({ theater: '123', date: moment().format('YYYYMMDD') });
        expect(screeningEvents.length).toEqual(1);
        expect(screeningEvents[0].films.length).toEqual(2);
    });

    it('getScreeningEvents 失敗', async () => {
        const httpStub: any = {};
        const storageServiceStub: any = {};
        const service = new ScheduleService(httpStub, storageServiceStub);
        const data: any = undefined;
        service.data = data;
        try {
            const theater = await service.getScreeningEvents({ theater: '123', date: moment().format('YYYYMMDD') });
        } catch (err) {
            expect(err.message);
        }
    });
});
