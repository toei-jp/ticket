/**
 * HeaderComponentテスト
 */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CallNativeService } from '../../../service/call-native/call-native.service';
import { MenuComponent } from '../../header/menu/menu.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
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
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });

    it('menuOpen', () => {
        component.menuOpen();
        expect(component.isMenuOpen).toBeTruthy();
    });

    it('menuClose', () => {
        component.menuClose();
        expect(component.isMenuOpen).toBeFalsy();
    });

});
