/**
 * NoTicketComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NoTicketComponent } from './no-ticket.component';

describe('NoTicketComponent', () => {
    let component: NoTicketComponent;
    let fixture: ComponentFixture<NoTicketComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NoTicketComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NoTicketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('コンポーネント生成', () => {
        expect(component).toBeTruthy();
    });
});
