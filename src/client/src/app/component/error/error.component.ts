/**
 * ErrorComponent
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AwsCognitoService } from '../../service/aws-cognito/aws-cognito.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    public isLoading: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private awsCognito: AwsCognitoService
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void { }

    /**
     * 接続
     * @method connect
     */
    public async connect() {
        this.isLoading = true;
        try {
            await this.awsCognito.authenticateWithDeviceId();
            if (!this.awsCognito.isAuthenticate()) {
                throw new Error('isAuthenticate is false');
            }
            this.activatedRoute.params.subscribe(
                (params) => {
                    const redirect = params.redirect;
                    let url = '/';
                    if (redirect !== undefined) {
                        url = redirect;
                    }
                    this.router.navigate([url]);
                }
            );

            return;
        } catch (err) {
            console.log('ErrorComponent.connect', err);
        }
        this.isLoading = false;
    }

}
