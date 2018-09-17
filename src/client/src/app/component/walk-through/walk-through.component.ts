/**
 * WalkThroughComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AwsCognitoService } from '../../service/aws-cognito/aws-cognito.service';

@Component({
    selector: 'app-walk-through',
    templateUrl: './walk-through.component.html',
    styleUrls: ['./walk-through.component.scss']
})
export class WalkThroughComponent implements OnInit {
    public config: SwiperOptions;
    public step: number;
    public isLoading: boolean;

    constructor(
        private router: Router,
        private awsCognito: AwsCognitoService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
        this.isLoading = false;
        this.step = 0;
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30,
            onSlideChangeEnd: (swiper) => {
                this.step = swiper.activeIndex;
            }
        };
    }

    /**
     * スタート
     * @method start
     * @returns {Promise<void>}
     */
    public async start(): Promise<void> {
        try {
            this.isLoading = true;
            await this.awsCognito.authenticateWithDeviceId();
            if (this.awsCognito.credentials === null) {
                throw new Error('credentials is null');
            }
            localStorage.setItem('deviceId', this.awsCognito.credentials.identityId);
            await this.router.navigate(['/']);
        } catch (error) {
            console.error(error);
        }
        this.isLoading = false;
    }

}
