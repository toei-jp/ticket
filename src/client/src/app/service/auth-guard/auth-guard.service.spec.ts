
/**
 * AuthGuardServiceテスト
 */
import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {

    it('canActivate 認証成功', async () => {
        const routerStub: any = {};
        const awsCognitoServiceStub: any = {
            authenticateWithDeviceId: () => {
                return Promise.resolve();
            }
        };
        spyOn(localStorage, 'getItem').and.returnValue('12345678');
        const service = new AuthGuardService(routerStub, awsCognitoServiceStub);
        const canActivate = await service.canActivate();
        expect(canActivate).toBeTruthy();
    });

    it('canActivate walkThroughへ', async () => {
        const routerStub: any = {
            navigate: () => { }
        };
        const awsCognitoServiceStub: any = {
            authenticateWithDeviceId: () => {
                return Promise.resolve();
            }
        };
        spyOn(localStorage, 'getItem').and.returnValue(null);
        const service = new AuthGuardService(routerStub, awsCognitoServiceStub);
        const canActivate = await service.canActivate();
        expect(canActivate).toBeFalsy();
    });

    it('canActivate 認証失敗', async () => {
        const routerStub: any = {
            navigate: () => { }
        };
        const awsCognitoServiceStub: any = {
            authenticateWithDeviceId: () => {
                return Promise.reject('Error');
            }
        };
        spyOn(localStorage, 'getItem').and.returnValue('12345678');
        const service = new AuthGuardService(routerStub, awsCognitoServiceStub);
        const canActivate = await service.canActivate();
        expect(canActivate).toBeFalsy();
    });
});
