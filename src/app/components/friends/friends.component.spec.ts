import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FriendsComponent} from './friends.component';


describe('FriendsComponent', () => {
    let component: FriendsComponent;
    let fixture: ComponentFixture<FriendsComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FriendsComponent ],
            imports: [ FormsModule, ToastrModule.forRoot(),
                RouterModule, RouterTestingModule],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FriendsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
