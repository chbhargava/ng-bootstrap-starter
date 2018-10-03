import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
  AuthService,
} from "angular-6-social-login";

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

import { SessionTimeoutComponent } from './components/session-timeout.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

import { Utils } from './services/utils';
import { UserAuthService } from './services/user-auth.service';

import { FakeBackendProvider } from './helpers/fake-bakend';
import { environment } from '../environments/environment';
import { AuthGuard } from './helpers/auth.gaurd';
import { HomeComponent } from './components/home/home.component';
import { FeaturesComponent } from './components/features/features.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowErrorsComponent } from './components/partials/show-errors.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("1004357134903-s4mrfph41nhptm713rtun4h0v1t1svug.apps.googleusercontent.com")
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("471510306668438")
        },
        {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider("81n843y6hvssco")
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SessionTimeoutComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    MyProfileComponent,
    HomeComponent,
    FeaturesComponent,
    ContactComponent,
    RegisterComponent,
    ShowErrorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRouting,
    AngularFontAwesomeModule,
    LoggerModule.forRoot({ 
      level: environment.production ? NgxLoggerLevel.LOG : NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF 
    }),
    LoadingBarRouterModule
  ],
  providers: [
    Utils,
    AuthGuard,
    AuthService,
    UserAuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
