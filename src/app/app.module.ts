import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {LoginPopupComponent} from './login-popup/login-popup.component';
import {LoginComponent} from './login/login.component';
import { CardComponent } from './card/card.component';


// Services
import { AuthService } from './services/solid.auth.service';
import { AuthGuard } from './services/auth.guard.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from './chat/chat.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';



const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login-popup',
        component: LoginPopupComponent
    },
    {
        path: 'card',
        component: CardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'register',
        component: RegisterComponent
    },


    {
        path: 'chat',
        component: ChatComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LoginPopupComponent,
        CardComponent,
        RegisterComponent,
        NavbarComponent,
        ChatComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        RouterModule,
        NgSelectModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,  //required for toastr
        ToastrModule,
        RouterTestingModule

    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
