/**
 * FilmOrderComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import { IIndividualScreeningEvent } from '../../../service/schedule/schedule.service';

@Component({
    selector: 'app-film-order',
    templateUrl: './film-order.component.html',
    styleUrls: ['./film-order.component.scss']
})
export class FilmOrderComponent implements OnInit {
    @Input() public data: {
        id: string;
        films: IIndividualScreeningEvent[];
    };
    public filmInfo: IIndividualScreeningEvent;

    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
        this.filmInfo = this.data.films[0];
    }

}
