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
import {By} from '@angular/platform-browser';

class MockChatService {

    written = false;

    async write(senderId, ruta, messageContent, user) {
        this.written = true;
    }

    async loadFriends(): Promise<string[]> {
      return ['pepe', 'luis'];
    }

    initChat(name) {

    }
}

describe('ChatComponent', () => {
    let component: ChatComponent;
    let fixture: ComponentFixture<ChatComponent>;



    beforeEach(async(() => {


        const chatServiceStub = {
            loadFriends: async () => ({}),
            write: () => ({})
        };

        const rdfServiceStub = {
            getProfile: () => ({}),
            updateProfile: () => ({})
        };
        const authServiceStub = {
            saveOldUserData: () => ({}),
            solidSignOut: () => ({})
        };




        TestBed.configureTestingModule({
            declarations: [ ChatComponent ],
            imports: [ FormsModule, ToastrModule.forRoot()],
            providers: [{ provide: ChatService, useClass: MockChatService},
                { provide: RdfService, useValue: rdfServiceStub },
                { provide: AuthService, useValue: authServiceStub }
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

    it('have to contain 2 friends', () => {
        expect(component.mi_listado_de_friends.length).toBe(2);
    });

    describe('Send the message', () => {


        it('send button', () => {
            spyOn(component, 'write');
            const boton = fixture.debugElement.query(By.css('#btn-chat')).nativeElement;
            boton.click();
            expect(component.write).toHaveBeenCalledTimes(1);

        });



    });

});
