/**
 * TicketComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as cinerino from '@toei-jp/cinerino-api-javascript-client';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss']
})
/**
 * チケット
 * @class TicketComponent
 * @implements OnInit
 */
export class TicketComponent implements OnInit {
    @Input() public reservation: cinerino.factory.order.IOrder;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {void}
     */
    public ngOnInit(): void {
    }

}
