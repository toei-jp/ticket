/**
 * TicketDetailComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as cinerino from '@toei-jp/cinerino-api-javascript-client';
import * as moment from 'moment';
import * as qrcode from 'qrcode';

@Component({
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
    @Input() public reservation: cinerino.factory.order.IOrder;
    @Input() public offer: cinerino.factory.order.IOffer;
    @Input() public index: number;
    public showQrCode: boolean;
    public qrCode: string;

    constructor() { }

    public async ngOnInit() {
        this.showQrCode = moment(this.offer.itemOffered.reservationFor.startDate).subtract(24, 'hours').unix() <= moment().unix();
        if (this.showQrCode) {
            const value = this.offer.itemOffered.reservedTicket.ticketToken;
            const basicSize = 21;
            const option: qrcode.QRCodeToDataURLOptions = {
                margin: 0,
                scale: (80 / basicSize)
            };
            this.qrCode = await this.createQrCode(value, option);
        }
    }

    private createQrCode(value: string, option: qrcode.QRCodeToDataURLOptions) {
        return new Promise<string>((resolve, reject) => {
            qrcode.toDataURL(value, option, (err, url) => {
                if (err !== null) {
                    reject(err);

                    return;
                }
                resolve(url);
            });
        });
    }

}
