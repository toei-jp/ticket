/**
 * ReservationService
 */
import { Injectable } from '@angular/core';
import * as cinerino from '@toei-jp/cinerino-api-javascript-client';
import * as moment from 'moment';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { StorageService } from '../storage/storage.service';

export type IReservation = cinerino.factory.order.IOrder;
export interface IReservationData {
    reservations: IReservation[];
    expired: number;
}

@Injectable()
export class ReservationService {
    public data: IReservationData;

    constructor(
        private awsCognito: AwsCognitoService,
        private storage: StorageService
    ) { }

    /**
     * 予約情報取得
     * @method getReservation
     * @returns {Promise<IReservationData>}
     */
    public async getReservation(): Promise<IReservationData> {
        const reservation: IReservationData = (this.data === undefined)
            ? this.storage.load('reservation')
            : this.data;
        if (reservation === undefined || reservation === null || reservation.expired < moment().unix()) {
            try {
                this.data = await this.fitchReservation();
                this.storage.save('reservation', this.data);
            } catch (err) {
                this.storage.remove('reservation');
                throw err;
            }
        } else {
            this.data = reservation;
        }

        return this.data;
    }

    /**
     * 予約をCognito経由で取得
     * @method fitchReservation
     * @returns {Promise<IReservationData>}
     */
    private async fitchReservation(): Promise<IReservationData> {
        const reservationRecord = await this.awsCognito.getRecords('reservation');
        const expired = 10;

        return {
            reservations: (reservationRecord.orders === undefined) ? [] : reservationRecord.orders,
            expired: moment().add(expired, 'milliseconds').unix()
        };
    }

    /**
     * パフォーマンスごとの予約情報取得（購入番号順）
     * @method getReservationByPurchaseNumber
     */
    public getReservationByPurchaseNumberOrder(): IReservation[] {
        return this.data.reservations.filter((reservation) => {
            if (reservation.acceptedOffers.length === 0) {
                return false;
            }
            const endDate = moment(reservation.acceptedOffers[0].itemOffered.reservationFor.endDate);

            return (endDate.unix() > moment().unix());
        });
    }

    /**
     * パフォーマンスごとの予約情報取得（鑑賞日順）
     * @method getReservationByAppreciationDayOrder
     */
    public getReservationByAppreciationDayOrder(): IReservation[] {
        const order = this.data.reservations.filter((reservation) => {
            if (reservation.acceptedOffers.length === 0) {
                return false;
            }
            const endDate = moment(reservation.acceptedOffers[0].itemOffered.reservationFor.endDate);

            return (endDate.unix() > moment().unix());
        });

        order.sort((a, b) => {
            const startDateA = moment(a.acceptedOffers[0].itemOffered.reservationFor.startDate).unix();
            const startDateB = moment(b.acceptedOffers[0].itemOffered.reservationFor.startDate).unix();
            if (startDateA < startDateB) {
                return -1;
            } else if (startDateA > startDateB) {
                return 1;
            } else {
                return 0;
            }
        });

        return order;
    }

    /**
     * プッシュ通知登録
     * @method registerNotifications
     */
    public registerNotifications(): void {
        const reservations = this.getReservationByPurchaseNumberOrder();
        reservations.forEach((reservation) => {
            const reservationFor = reservation.acceptedOffers[0].itemOffered.reservationFor;
            const data = JSON.stringify({
                method: 'notification',
                value: {
                    id: Number(reservation.orderNumber.replace(/\-/g, '')),
                    title: '上映時間が近づいています',
                    text: `${moment(reservationFor.startDate).format('YYYY/MM/DD HH:mm')} ${reservationFor.workPerformed.name}`,
                    trigger: { at: moment(reservationFor.startDate).subtract(30, 'minutes').toISOString() }
                }
            });
            window.parent.postMessage(data, '*');
        });
    }

}
