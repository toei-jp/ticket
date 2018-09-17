/**
 * ルーティング
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './component/about/about.component';
import { BaseComponent } from './component/base/base.component';
import { ErrorComponent } from './component/error/error.component';
import { LawComponent } from './component/law/law.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PolicyComponent } from './component/policy/policy.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { ScheduleComponent } from './component/purchase/schedule/schedule.component';
import { TicketHolderComponent } from './component/ticket/ticket-holder/ticket-holder.component';
import { WalkThroughComponent } from './component/walk-through/walk-through.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/ticket', pathMatch: 'full' },
    {
        path: '',
        component: BaseComponent,
        canActivate: [AuthGuardService],
        children: [
            { path: 'ticket', component: TicketHolderComponent },
            { path: 'purchase', component: ScheduleComponent },
            { path: 'about', component: AboutComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'law', component: LawComponent },
            { path: 'privacy', component: PrivacyComponent }
        ]
    },
    { path: 'walkThrough', component: WalkThroughComponent },
    { path: 'error/:redirect', component: ErrorComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: NotFoundComponent }
];

// tslint:disable-next-line:no-stateless-class
@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { useHash: true, enableTracing: true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
