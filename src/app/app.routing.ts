import { RouterModule, Routes } from '@angular/router';
import { SessionTimeoutComponent } from './components/session-timeout.component';
import { AuthGuard } from './helpers/auth.gaurd';
import { ROUTE } from './app.constants';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { HomeComponent } from './components/home/home.component';
import { FeaturesComponent } from './components/features/features.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: ROUTE.SESSION_TIMEOUT, component: SessionTimeoutComponent },
    { path: ROUTE.REGISTER, component: RegisterComponent },
    { path: ROUTE.HOME, component: HomeComponent },
    { path: ROUTE.FEATURES, component: FeaturesComponent },
    { path: ROUTE.CONTACT, component: ContactComponent },
    
    // Private routes 
    { path: ROUTE.MY_PROFILE, component: MyProfileComponent, canActivate: [AuthGuard] },

    // Default Route:
    { path: '**', component: RegisterComponent },
    
];
export const AppRouting = RouterModule.forRoot(routes ,{useHash:true});