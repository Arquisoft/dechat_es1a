import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {AppComponent} from '../app.component';
import {AuthService} from '../services/solid.auth.service';
import {RdfService} from '../services/rdf.service';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;


    beforeEach(async(() => {
        const rdfServiceStub = {
            getProfile: () => ({}),
            updateProfile: () => ({})
        };
        const authServiceStub = {
            saveOldUserData: () => ({}),
            solidSignOut: () => ({})
        };



        TestBed.configureTestingModule({
            declarations: [ CardComponent ],
            imports: [ FormsModule, ToastrModule.forRoot(),
                RouterModule, RouterTestingModule],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [

                { provide: RdfService, useValue: rdfServiceStub },
                { provide: AuthService, useValue: authServiceStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should render title in a h1 tag', async(() => {
        fixture = TestBed.createComponent(CardComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Profile');
    }));
});
