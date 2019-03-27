import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {RdfService} from '../services/rdf.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/solid.auth.service';
import {ToastrService} from 'ngx-toastr';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CardComponent ],
            imports: [ FormsModule ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            providers: [ToastrService]
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
