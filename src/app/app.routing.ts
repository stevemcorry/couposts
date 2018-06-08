import {LandingComponent} from './components/landing/landing.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { BusinessAboutComponent } from './components/business-about/business-about.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './components/redirect/redirect.component';
import { AboutComponent } from 'app/components/about/about.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';

const APP_ROUTES: Routes = [
    { path: 'land', component: LandingComponent },
    { path: 'businessprofile/:id', component: BusinessProfileComponent },
    { path: 'userprofile/:id', component: UserProfileComponent },
    { path: 'signup', component: BusinessAboutComponent },
    { path: '', component: HomeComponent },
    { path: 'auth', component: RedirectComponent },
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminComponent },
    { path: '404', component: HomeComponent},
    { path: '**', redirectTo: '/404'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
