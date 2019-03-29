import {CardComponent} from './card/card.component';
import {AppComponent} from './app.component';
import {async, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                CardComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ToastrModule.forRoot(),
                RouterModule,
                RouterTestingModule
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [ToastrService]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});