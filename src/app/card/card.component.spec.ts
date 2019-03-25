import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {RdfService} from '../services/rdf.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/solid.auth.service';
import {ToastrService} from 'ngx-toastr';

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
   // let toastr: ToastrService;
    //let rdf: RdfService;

    beforeEach(() => {
        //toastr = new ToastrService();
        //rdf = new RdfService(ToastrService)});

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
        //component.cardForm = new CardComponent(rdf, ActivatedRoute, AuthService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
