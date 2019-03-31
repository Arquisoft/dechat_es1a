import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {AuthService} from '../services/solid.auth.service';
import {RdfService} from '../services/rdf.service';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;


    beforeEach(async(() => {
        const activatedRouteMock = {};
        const rdfServiceMock = {
        };
        const authServiceMock = {
        };
        TestBed.configureTestingModule({
            declarations: [ CardComponent ],
            imports: [ FormsModule, ToastrModule.forRoot(),
                RouterModule, RouterTestingModule],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: RdfService, useValue: rdfServiceMock },
                { provide: AuthService, useValue: authServiceMock}
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
});
