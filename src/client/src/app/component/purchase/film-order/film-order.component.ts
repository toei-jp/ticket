/**
 * FilmOrderComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import { IScreeningEvent } from '../../../service/schedule/schedule.service';

@Component({
    selector: 'app-film-order',
    templateUrl: './film-order.component.html',
    styleUrls: ['./film-order.component.scss']
})
export class FilmOrderComponent implements OnInit {
    @Input() public data: {
        id: string;
        films: IScreeningEvent[];
    };
    public filmInfo: IScreeningEvent;

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
