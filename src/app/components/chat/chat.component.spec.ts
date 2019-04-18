import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ChatComponent} from './chat.component';
import {RdfService} from '../../services/rdf.service';
import {ChatService} from '../../services/chat.service';
import {AuthService} from '../../services/solid.auth.service';


describe('ChatComponent', () => {
    let component: ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;



    beforeEach(async(() => {


        const chatServiceStub = {
            loadFriends: async () => ({}),
            createBaseFolder: () => ({})
        };




        TestBed.configureTestingModule({
            declarations: [ ChatComponent ],
            imports: [ FormsModule, ToastrModule.forRoot()],
            providers: [{ provide: ChatService, useValue: chatServiceStub },
               ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    describe('initSelection', () => {
        it('inicia', () => {
            spyOn(component, 'initSelection');
            component.initSelection('ruta');
            expect(component.initSelection).toHaveBeenCalledTimes(1);

        });
    });

});
