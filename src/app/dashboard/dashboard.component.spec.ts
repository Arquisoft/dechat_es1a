import {DashboardComponent} from './dashboard.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardComponent ],
            imports: [ FormsModule, ToastrModule.forRoot(),
                RouterModule, RouterTestingModule],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
