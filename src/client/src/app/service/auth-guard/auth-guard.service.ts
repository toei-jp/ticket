/**
 * AuthGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private awsCognito: AwsCognitoService
    ) { }

    /**
     * 認証
     * @method canActivate
     * @returns {Promise<boolean>}
     */
    public async canActivate(): Promise<boolean> {
        try {
            await this.awsCognitoAuthenticateCheck();

            return true;
        } catch (err) {
            console.log('canActivate', err);

            return false;
        }
    }

    /**
     * awsCognitoへ認証確認
     * @method awsCognitoAuthenticateCheck
     * @returns {Promise<void>}
     */
    private async awsCognitoAuthenticateCheck(): Promise<void> {
        const deviceId = localStorage.getItem('deviceId');
        if (deviceId === null) {
            this.router.navigate(['/walkThrough']);
            throw new Error('deviceId is null');
        }
        try {
            await this.awsCognito.authenticateWithDeviceId();
        } catch (err) {
            this.router.navigate(['/error']);
            throw err;
        }
    }
}
