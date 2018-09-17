/**
 * NgModule
 */

// tslint:disable-next-line:no-submodule-imports
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { SwiperModule } from 'angular2-useful-swiper';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './component/about/about.component';
import { AppComponent } from './component/app/app.component';
import { BaseComponent } from './component/base/base.component';
import { ErrorComponent } from './component/error/error.component';
import { HeaderComponent } from './component/header/header/header.component';
import { MenuComponent } from './component/header/menu/menu.component';
import { LawComponent } from './component/law/law.component';
import { LoadingComponent } from './component/loading/loading.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { PolicyComponent } from './component/policy/policy.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { FilmOrderPerformanceComponent } from './component/purchase/film-order-performance/film-order-performance.component';
import { FilmOrderComponent } from './component/purchase/film-order/film-order.component';
import { ScheduleComponent } from './component/purchase/schedule/schedule.component';
import { NoTicketComponent } from './component/ticket/no-ticket/no-ticket.component';
import { TicketDetailComponent } from './component/ticket/ticket-detail/ticket-detail.component';
import { TicketHolderComponent } from './component/ticket/ticket-holder/ticket-holder.component';
import { TicketComponent } from './component/ticket/ticket/ticket.component';
import { WalkThroughComponent } from './component/walk-through/walk-through.component';
import { AvailabilityPipe } from './pipe/availability/availability.pipe';
import { DurationPipe } from './pipe/duration/duration.pipe';
import { TimeFormatPipe } from './pipe/time-format/time-format.pipe';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { AwsCognitoService } from './service/aws-cognito/aws-cognito.service';
import { CallNativeService } from './service/call-native/call-native.service';
import { MaintenanceService } from './service/maintenance/maintenance.service';
import { ReservationService } from './service/reservation/reservation.service';
import { ScheduleService } from './service/schedule/schedule.service';
import { SelectService } from './service/select/select.service';
import { StorageService } from './service/storage/storage.service';

// tslint:disable-next-line:no-stateless-class
@NgModule({
  declarations: [
    AppComponent,
    TicketHolderComponent,
    TicketComponent,
    WalkThroughComponent,
    NavigationComponent,
    HeaderComponent,
    MenuComponent,
    ScheduleComponent,
    NotFoundComponent,
    BaseComponent,
    TimeFormatPipe,
    FilmOrderComponent,
    AvailabilityPipe,
    DurationPipe,
    NoTicketComponent,
    AboutComponent,
    LoadingComponent,
    PolicyComponent,
    LawComponent,
    PrivacyComponent,
    ErrorComponent,
    FilmOrderPerformanceComponent,
    TicketDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    SwiperModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuardService,
    AwsCognitoService,
    ReservationService,
    ScheduleService,
    SelectService,
    StorageService,
    CallNativeService,
    MaintenanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
