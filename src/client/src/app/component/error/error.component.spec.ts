/**
 * ErrorComponent
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AwsCognitoService } from '../../service/aws-cognito/aws-cognito.service';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    it('コンポーネント生成', async () => {
        const awsCognitoServiceStub = {};
        await TestBed.configureTestingModule({
            declarations: [
                ErrorComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: AwsCognitoService, useValue: awsCognitoServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(ErrorComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('connect', async () => {
        const awsCognitoServiceStub = {
            authenticateWithDeviceId: () => {
                return Promise.resolve({});
            },
            isAuthenticate: () => true
        };
        await TestBed.configureTestingModule({
            declarations: [
                ErrorComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: AwsCognitoService, useValue: awsCognitoServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(ErrorComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.connect();
        expect(component.isLoading).toBeTruthy();
    });

    it('connect 端末IDで認証エラー', async () => {
        const awsCognitoServiceStub = {
            authenticateWithDeviceId: () => {
                return Promise.reject('端末IDで認証エラー');
            },
            isAuthenticate: () => true
        };
        await TestBed.configureTestingModule({
            declarations: [
                ErrorComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: AwsCognitoService, useValue: awsCognitoServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(ErrorComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.connect();
        expect(component.isLoading).toBeFalsy();
    });

    it('connect 認証確認エラー', async () => {
        const awsCognitoServiceStub = {
            authenticateWithDeviceId: () => {
                return Promise.resolve({});
            },
            isAuthenticate: () => false
        };
        await TestBed.configureTestingModule({
            declarations: [
                ErrorComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: AwsCognitoService, useValue: awsCognitoServiceStub }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(ErrorComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
        await component.connect();
        expect(component.isLoading).toBeFalsy();
    });
});
