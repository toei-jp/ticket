/**
 * ScheduleService
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cinerino from '@toei-jp/cinerino-api-javascript-client';
import * as moment from 'moment';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

export type IMovieTheater = cinerino.factory.organization.movieTheater.IOrganizationWithoutGMOInfo;
export type IIndividualScreeningEvent = cinerino.factory.event.individualScreeningEvent.IEventWithOffer;
export interface IFilmOrder {
    id: string;
    films: IIndividualScreeningEvent[];
}
export interface IScheduleData {
    schedule: ISchedule[];
    expired: number;
}
export interface ISchedule {
    theater: IMovieTheater;
    schedule: {
        date: string;
        individualScreeningEvents: IIndividualScreeningEvent[];
    }[];
}
export interface IDate {
    value: string;
    displayText: string;
    serviceDay: string;
}

@Injectable()
export class ScheduleService {
    public data: IScheduleData;

    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }

    /**
     * スケジュール取得
     * @method getSchedule
     * @returns {Promise<IScheduleData>}
     */
    public async getSchedule(): Promise<IScheduleData> {
        const schedule: IScheduleData = (this.data === undefined)
            ? this.storage.load('schedule')
            : this.data;
        if (schedule === undefined || schedule === null || schedule.expired < moment().unix()) {
            try {
                this.data = await this.fitchSchedule({
                    startFrom: moment().toISOString(),
                    startThrough: moment().add(1, 'month').toISOString()
                });
                this.storage.save('schedule', this.data);
                console.log(this.data);
            } catch (err) {
                console.log(err);
                this.storage.remove('schedule');
                throw err;
            }
        } else {
            this.data = schedule;
        }

        return this.data;
    }

    /**
     * スケジュールをAPI経由で取得
     * @method fitchISchedule
     * @returns {Promise<IScheduleData>}
     */
    private async fitchSchedule(
        args: { startFrom: string; startThrough: string; }
    ): Promise<IScheduleData> {
        const url = `${environment.ticketingSite}/purchase/performances/getSchedule`;
        const options = {
            params: new HttpParams({
                fromObject: {
                    startFrom: args.startFrom,
                    startThrough: args.startThrough
                }
            }),
            reportProgress: true
        };
        const response = await this.http.get<{
            result: {
                theaters: IMovieTheater[],
                screeningEvents: IIndividualScreeningEvent[]
            }
        }>(url, options).retry(3).toPromise();
        const result = response.result;
        const expired = 10;
        const schedule: ISchedule[] = [];
        result.theaters.forEach((theater) => {
            const theaterSchedule: {
                date: string;
                individualScreeningEvents: IIndividualScreeningEvent[];
            }[] = [];
            const theaterScreeningEvents = result.screeningEvents.filter((screeningEvent) => {
                return (screeningEvent.superEvent.location.branchCode === theater.location.branchCode);
            });
            const diff = moment(args.startThrough).diff(moment(args.startFrom), 'days');
            for (let i = 0; i < diff; i += 1) {
                const date = moment(args.startFrom).add(i, 'days').format('YYYYMMDD');
                const tmpDateScreeningEvents = theaterScreeningEvents.filter((screeningEvent) => {
                    return (screeningEvent.coaInfo.dateJouei === date);
                });
                const dateScreeningEvents: IIndividualScreeningEvent[] = [];
                tmpDateScreeningEvents.forEach((screeningEvent) => {
                    const startDate = moment(screeningEvent.startDate).format('YYYYMMDD');
                    const limitDate = moment().add(3, 'days').format('YYYYMMDD');
                    if (this.isSalse(screeningEvent) || startDate < limitDate) {
                        dateScreeningEvents.push(screeningEvent);
                    }
                });
                theaterSchedule.push({
                    date: date,
                    individualScreeningEvents: dateScreeningEvents
                });
            }
            schedule.push({
                theater: theater,
                schedule: theaterSchedule
            });
        });

        return {
            schedule: schedule,
            expired: moment().add(expired, 'minutes').unix()
        };
    }

    /**
     * 劇場取得
     * @method getTheater
     * @returns {<IMovieTheater[]}
     */
    public getTheater(): IMovieTheater[] {
        if (this.data === undefined) {
            throw new Error('getTheater: schedule is undefined');
        }

        return this.data.schedule.map((schedule) => {
            return schedule.theater;
        });
    }

    /**
     * 日付取得
     * @method getDate
     * @returns {IDate[]}
     */
    public getDate(theaterCode: string): IDate[] {
        if (this.data === undefined) {
            throw new Error('getDate: schedule is undefined');
        }

        const theaterSchedule = this.data.schedule.find((schedule) => {
            return (schedule.theater.location.branchCode === theaterCode);
        });

        if (theaterSchedule === undefined) {
            throw new Error('theaterSchedule is undefined');
        }

        const minDisplayDay = 2;
        const dateList = theaterSchedule.schedule.filter((schedule) => {
            const screeningEvents = schedule.individualScreeningEvents.filter((screeningEvent) => {
                return (this.isSalse(screeningEvent));
            });

            // return (screeningEvents.length > 0);
            return (moment(schedule.date).unix() < moment().add(minDisplayDay, 'days').unix()
                || screeningEvents.length > 0);
        });

        let count = 0;

        return dateList.map((schedule) => {
            const formatDate = moment(schedule.date).format('YYYY/MM/DD');
            const result = {
                value: schedule.date,
                displayText: (count === 0) ? `本日 (${formatDate})`
                    : (count === 1) ? `明日 (${formatDate})`
                        : (count === 2) ? `明後日 (${formatDate})` : formatDate,
                serviceDay: (schedule.individualScreeningEvents.length > 0)
                    ? schedule.individualScreeningEvents[0].coaInfo.nameServiceDay
                    : ''
            };
            count += 1;

            return result;
        });
    }

    /**
     * 作品別上映スケジュール取得
     * @function getScreeningEvents
     * @returns {Promise<IFilmOrder[]>}
     */
    public async getScreeningEvents(args: { theater: string, date: string }): Promise<IFilmOrder[]> {
        if (this.data === undefined) {
            throw new Error('getScreeningEvents: schedule is undefined');
        }
        const results: IFilmOrder[] = [];
        const theaterSchedule = this.data.schedule.find((schedule) => {
            return (schedule.theater.location.branchCode === args.theater);
        });
        if (theaterSchedule === undefined) {
            throw new Error('theaterSchedule is undefined');
        }
        const dateSchedule = theaterSchedule.schedule.find((schedule) => {
            return (schedule.date === args.date);
        });
        if (dateSchedule === undefined) {
            throw new Error('dateSchedule is undefined');
        }
        const screeningEvents = dateSchedule.individualScreeningEvents.filter((screeningEvent) => {
            return (this.isSalse(screeningEvent));
        });

        screeningEvents.forEach((screeningEvent) => {
            // 販売可能時間判定
            if (!this.isSalseTime(screeningEvent)) {
                return;
            }
            const film = results.find((event) => {
                return (event.id === (screeningEvent.coaInfo.titleCode + screeningEvent.coaInfo.titleBranchNum));
            });
            if (film === undefined) {
                results.push({
                    id: (screeningEvent.coaInfo.titleCode + screeningEvent.coaInfo.titleBranchNum),
                    films: [screeningEvent]
                });
            } else {
                film.films.push(screeningEvent);
            }
        });

        return results;
    }

    /**
     * 販売可能時間判定
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    private isSalseTime(screeningEvent: IIndividualScreeningEvent): boolean {
        const END_TIME = 30; // 30分前

        return (moment().unix() < moment(screeningEvent.startDate).subtract(END_TIME, 'minutes').unix());
    }

    /**
     * 販売可能判定
     * @param {IIndividualScreeningEvent} screeningEvent
     * @returns {boolean}
     */
    private isSalse(screeningEvent: IIndividualScreeningEvent): boolean {
        const PRE_SALE = '1'; // 先行販売

        return (screeningEvent.coaInfo.rsvStartDate <= moment().format('YYYYMMDD')
            || screeningEvent.coaInfo.flgEarlyBooking === PRE_SALE);
    }

}
