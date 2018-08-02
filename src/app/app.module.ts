import { routing } from './app.routing';

import { TextMaskModule } from 'angular2-text-mask';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { BusinessSignupComponent } from './modals/business-signup/business-signup.component';
import { UserSignupComponent } from './modals/user-signup/user-signup.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { BusinessAboutComponent } from './components/business-about/business-about.component';
import { UploadComponent } from './modals/upload/upload.component';
import { DealEditComponent } from './modals/deal-edit/deal-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './modals/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { EditDealsComponent } from './components/edit-deals/edit-deals.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { DealModalComponent } from './modals/deal-modal/deal-modal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserDealsFilter } from './filters/user-deals.filter';
import { DealHeaderComponent } from './templates/deal-header/deal-header.component';
import { CarouselComponent } from './templates/carousel/carousel.component';
import { DealComponent } from './templates/deal/deal.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeBusinessModalComponent } from './modals/welcome-business-modal/welcome-business-modal.component';
import { BusinessWebsiteModalComponent } from './modals/business-website-modal/business-website-modal.component';
import { BusinessLocationsModalComponent } from './modals/business-locations-modal/business-locations-modal.component';
import { BusinessUploadModalComponent } from './modals/business-upload-modal/business-upload-modal.component';
import { BusinessFinishModalComponent } from './modals/business-finish-modal/business-finish-modal.component';
import { AgmCoreModule } from '@agm/core';
import { PaymentModule } from './payments/payment/payment.module';

import { SimpleNotificationsModule } from 'angular2-notifications-lite';
import { UserDemoComponent } from './modals/user-demo/user-demo.component';
import { VerifyInstaModalComponent } from './modals/verify-insta-modal/verify-insta-modal.component';
import { BusinessAboutTemplateComponent } from './templates/business-about-template/business-about-template.component';
import { DealsFilter } from './filters/deals.filter';
import { CoupostTipsComponent } from './modals/coupost-tips/coupost-tips.component';
import { ValidLocationsComponent } from './templates/valid-locations/valid-locations.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    BusinessSignupComponent,
    UserSignupComponent,
    BusinessProfileComponent,
    BusinessAboutComponent,
    UploadComponent,
    DealEditComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RedirectComponent,
    EditDealsComponent,
    FooterComponent,
    AboutComponent,
    DealModalComponent,
    UserProfileComponent,
    AdminComponent,
    UserDealsFilter,
    DealsFilter,
    DealHeaderComponent,
    CarouselComponent,
    DealComponent,
    WelcomeBusinessModalComponent,
    BusinessWebsiteModalComponent,
    BusinessLocationsModalComponent,
    BusinessUploadModalComponent,
    BusinessFinishModalComponent,
    UserDemoComponent,
    VerifyInstaModalComponent,
    BusinessAboutTemplateComponent,
    CoupostTipsComponent,
    ValidLocationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    Ng2Bs3ModalModule,
    TextMaskModule,
    HttpClientModule,  
    SimpleNotificationsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.placeskey,
      libraries: ["places"]
    }),
    PaymentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
