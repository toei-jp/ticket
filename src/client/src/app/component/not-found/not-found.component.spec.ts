/**
 * NotFoundComponentテスト
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
    it('コンポーネント生成', async () => {
        await TestBed.configureTestingModule({
            declarations: [
                NotFoundComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ]
        })
            .compileComponents();
        const fixture = TestBed.createComponent(NotFoundComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        await expect(component).toBeTruthy();
    });
});
