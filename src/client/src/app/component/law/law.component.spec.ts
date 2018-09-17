/**
 * LawComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawComponent } from './law.component';

describe('LawComponent', () => {
    let component: LawComponent;
    let fixture: ComponentFixture<LawComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LawComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LawComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
