import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { DateFilterPipe } from 'src/date-filter.pipe';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NetworkInterceptor } from './network.interceptor';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent, 
  MsalInterceptorConfiguration, MsalGuardConfiguration, MSAL_INTERCEPTOR_CONFIG, MSAL_GUARD_CONFIG, MSAL_INSTANCE } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType, BrowserCacheLocation, IPublicClientApplication } from "@azure/msal-browser";
import { CalendarModule, DateAdapter as DateAdapter2 } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CaptchanewComponent } from './captchanew/captchanew.component'; 
import { NgxSpinnerModule } from "ngx-spinner";
import { TurnstileCaptchaComponent } from './turnstile-captcha/turnstile-captcha.component';


const isIE=window.navigator.userAgent.indexOf('MSIE')>-1
||window.navigator.userAgent.indexOf('Trident/')>-1


@NgModule({
  declarations: [
    
    AppComponent,
  
         DateFilterPipe,
         CaptchanewComponent,
         TurnstileCaptchaComponent,
         

 
  ],
  
  imports: [
    BrowserModule,    
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
              clientId:'dcbaf086-b229-4540-b7a5-68af8004c712',
           //  redirectUri:'https://iodeu-bah-apw01.azurewebsites.net',
          //redirectUri:'https://iopeu-bah-apw01.azurewebsites.net',
                //redirectUri:'https://opsbahrain.gac.com',
              redirectUri:'http://localhost:4200',
              authority:'https://login.microsoftonline.com/6e9db74c-11b7-459e-b199-9f044662d260'

            
          },
          cache:
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:isIE
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.Read','user.Read.All']
        }
      },
    
      {
        interactionType:InteractionType.Redirect,
        protectedResourceMap:new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.Read']],
             ['https://graph.microsoft.com/v1.0/users',['user.Read.All']]
          ]
        )
      }
    )
    ,
     
    CalendarModule.forRoot({ provide: DateAdapter2, useFactory: adapterFactory  })

    
  ],
  providers: [

   

    {
     provide:HTTP_INTERCEPTORS,
     useClass:NetworkInterceptor,
     multi:true
    },
    
 
  {
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },
 
  {provide:MatDialogRef , useValue:{}},

 

  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  
 

  { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, 
    MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }, 
  {
      provide: MAT_DATE_FORMATS, useValue: {
          parse: {
              dateInput: "L",
          },
          display: {
              dateInput: "L",
              monthYearLabel: "MMM YYYY",
              dateA11yLabel: "LL",
              monthYearA11yLabel: "MMMM YYYY",
          },
      }
  },

  { provide: MAT_DIALOG_DATA, useValue: {} },


  DatePipe,
  MsalService,
   MsalGuard,
   MsalBroadcastService,


  ],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
