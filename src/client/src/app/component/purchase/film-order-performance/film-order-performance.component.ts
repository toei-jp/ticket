/**
 * FilmOrderPerformanceComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import * as cinerino from '@toei-jp/cinerino-api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { AwsCognitoService } from '../../../service/aws-cognito/aws-cognito.service';

type IScreeningEvent = cinerino.factory.chevre.event.screeningEvent.IEvent;

@Component({
    selector: 'app-film-order-performance',
    templateUrl: './film-order-performance.component.html',
    styleUrls: ['./film-order-performance.component.scss']
})
export class FilmOrderPerformanceComponent implements OnInit {
    @Input() public performance: IScreeningEvent;
    public salseFlg: boolean;

    constructor(private awsCognito: AwsCognitoService) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {void}
     */
    public ngOnInit(): void {
        this.salseFlg = moment(this.performance.startDate).unix() > moment().add(30, 'minutes').unix();
    }

    /**
     * パフォーマンス選択
     * @method performanceSelect
     */
    public performanceSelect() {
        if (this.performance.remainingAttendeeCapacity === 0) {
            return;
        }
        if (this.awsCognito.credentials === null) {
            return;
        }

        const params = `id=${this.performance.identifier}&identityId=${this.awsCognito.credentials.identityId}&native=1&member=0`;

        location.href =
            `${environment.entranceServerUrl}/ticket/index.html?${params}`;
    }

}
