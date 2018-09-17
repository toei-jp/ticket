/**
 * MenuComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CallNativeService } from '../../../service/call-native/call-native.service';
import {MenuComponent } from './menu.component';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                CallNativeService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成 isOpen = false', () => {
        component.isOpen = false;
        expect(component).toBeTruthy();
    });

    it('コンポーネント生成 isOpen = true', () => {
        component.isOpen = true;
        expect(component).toBeTruthy();
    });
});
