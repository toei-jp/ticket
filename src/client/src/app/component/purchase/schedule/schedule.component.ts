/**
 * ScheduleComponent
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMaintenance, MaintenanceService } from '../../../service/maintenance/maintenance.service';
import { IDate, IFilmOrder, IMovieTheater, ScheduleService } from '../../../service/schedule/schedule.service';
import { IPurchaseSelect, SelectService } from '../../../service/select/select.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
/**
 * チケット購入
 * @class ScheduleComponent
 * @implements OnInit
 */
export class ScheduleComponent implements OnInit {
    public isLoading: boolean;
    public isTheaterChangeable: boolean;
    public theaters: IMovieTheater[];
    public dateList: IDate[];
    public filmOrder: IFilmOrder[];
    public conditions: IPurchaseSelect;
    public error: string;
    public maintenanceInfo: IMaintenance;

    constructor(
        private router: Router,
        private schedule: ScheduleService,
        private select: SelectService,
        private maintenance: MaintenanceService,
        private activatedRoute: ActivatedRoute
    ) {
        this.theaters = [];
        this.dateList = [];
        this.filmOrder = [];
    }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.isTheaterChangeable = true;
        try {
            this.maintenanceInfo = await this.maintenance.isMaintenance();
            if (this.maintenanceInfo.isMaintenance) {
                this.isLoading = false;

                return;
            }
            this.conditions = this.select.getSelect().purchase;
            this.activatedRoute.queryParamMap.subscribe((query) => {
                const theater = query.get('theater');
                this.conditions.theater.keyword = theater === null ? '' : theater;
            });
            await this.schedule.getSchedule();
            this.theaters = this.schedule.getTheater();
            await this.changeConditions();
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log('ScheduleComponent.ngOnInit', err);
        }

        this.isLoading = false;
    }

    /**
     * 条件変更
     * @method changeConditions
     * @returns {Promise<void>}
     */
    public async changeConditions(): Promise<void> {
        this.isLoading = true;
        this.select.data.purchase = this.conditions;
        this.select.save();
        this.filmOrder = [];
        try {
            await this.schedule.getSchedule();
            this.theaters = this.schedule.getTheater();
            const selectTheater = this.theaters.find((theater) => {
                if (this.conditions.theater.keyword !== '') {
                    if (
                        theater.location.name.en.toLocaleLowerCase()
                            .indexOf(this.conditions.theater.keyword.toLocaleLowerCase()) >= 0
                    ) {
                        this.conditions.theater.branchCode = theater.location.branchCode;
                        this.isTheaterChangeable = false;
                        return true;
                    }
                }
                return (theater.location.branchCode === this.conditions.theater.branchCode);
            });
            if (selectTheater === undefined) {
                this.select.data.purchase.theater = { branchCode: '', keyword: '' };
                this.select.data.purchase.date = '';
                this.select.save();
                this.isLoading = false;

                return;
            }
            this.dateList = await this.schedule.getDate(selectTheater.location.branchCode);
            const selectDate = this.dateList.find((date) => {
                return (date.value === this.conditions.date);
            });
            if (selectDate === undefined) {
                this.select.data.purchase.date = '';
                this.select.save();
                this.isLoading = false;

                return;
            }

            this.filmOrder = await this.schedule.getScreeningEvents({
                theater: selectTheater.location.branchCode,
                date: selectDate.value
            });
        } catch (err) {
            this.router.navigate(['/error', { redirect: '/purchase' }]);
            console.log(err);
        }
        this.isLoading = false;
    }

}
