import { ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RegisterComponent } from './register.component';
import {AuthService} from '../services/solid.auth.service';
describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    beforeEach(() => {
        const authServiceMock = {};
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [RegisterComponent],
            providers: [{ provide: AuthService, useValue: authServiceMock }]
        });
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
    });
   it('should create', () => {
      expect(component).toBeTruthy();
   });

});
