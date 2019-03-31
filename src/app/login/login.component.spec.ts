import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {LoginComponent} from './login.component';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent],
            imports: [ FormsModule, ToastrModule.forRoot(),
                RouterModule, RouterTestingModule],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});