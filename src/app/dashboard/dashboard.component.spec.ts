import {DashboardComponent} from './dashboard.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RdfService} from '../services/rdf.service';
import {AuthService} from '../services/solid.auth.service';


describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;


    beforeEach(async(() => {
        const activatedRouteMock = {};
        const rdfServiceMock = {
        };
        const authServiceMock = {
            solidLogin: () => ({})
        };

        TestBed.configureTestingModule({
            declarations: [ DashboardComponent ],
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
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
       // const service = fixture.debugElement.injector.get(AuthService);
       // spyOn(service, 'solidLogin').and.returnValue(true);
        expect(component).toBeTruthy();
    });

});
