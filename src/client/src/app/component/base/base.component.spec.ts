/**
 * MainComponentテスト
 */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from '../navigation/navigation.component';
import { BaseComponent } from './base.component';

// tslint:disable-next-line:no-stateless-class component-selector
@Component({ selector: 'app-header', template: '' })
class HeaderComponent { }

describe('MainComponent', () => {
    let component: BaseComponent;
    let fixture: ComponentFixture<BaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BaseComponent,
                HeaderComponent,
                NavigationComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
