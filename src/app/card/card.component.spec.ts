import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CardComponent} from './card.component';
import {AppComponent} from '../app.component';


describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CardComponent ]
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
        const fx = TestBed.createComponent(CardComponent);
        fx.detectChanges();
        const compiled = fx.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to solid-app!');
    }));
});
