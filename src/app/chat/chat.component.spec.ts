import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ChatComponent} from './chat.component';
import {RdfService} from '../services/rdf.service';
import {ChatService} from '../services/chat.service';
import {AuthService} from '../services/solid.auth.service';
import {By} from '@angular/platform-browser';
import {SolidSession} from '../models/solid-session.model';

class MockChatService {

    written = false;
    ruta_seleccionada = 'fooRoute';

    async write(senderId, ruta, messageContent, user) {
        this.written = true;
    }

    async loadFriends(): Promise<string[]> {
      return ['pepe', 'luis'];
    }

    initChat(name) {

    }

    actualizar(ruta_seleccionada) {
        return ['fooMessage1'];
    }
    order() {}
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
            session: new class implements SolidSession {
                accessToken: 'fooSession';
                clientId: 'fooClientId';
                idToken: 'fooidToken';
                sessionKey: 'fooSessionKey';
                webId: 'fooWebId';
            },
            getProfile: () => ({}),
            updateProfile: () => ({})
        };
        const authServiceStub = {
            saveOldUserData: () => ({}),
            solidSignOut: () => ({})
        };




        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
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


        it('send button must call to write method', () => {
            spyOn(component, 'write');
            const boton = fixture.debugElement.query(By.css('#btn-chat')).nativeElement;
            boton.click();
            expect(component.write).toHaveBeenCalledTimes(1);

        });

        it('write method should call the chat service', () => {
            const chat: ChatService = fixture.debugElement.injector.get(ChatService);
            spyOn(chat, 'write');
            component.write();
            expect(chat.write).toHaveBeenCalledTimes(1);

        });

        it('getPicture must return the profile photo', () => {
            const user = 'https://yagoprado.solid.community/profile/card#me'
            expect(component.getProfilePicture(user)).toBe('https://yagoprado.solid.community/profile/perfil.jpeg');

        });

        it('initSelection must put receiver ', () => {
            const chat: ChatService = fixture.debugElement.injector.get(ChatService);
            spyOn(chat, 'initChat');
            component.initSelection('https://fooroute')
            expect(chat.initChat).toHaveBeenCalledTimes(1);
            expect(document.getElementById('receiver').innerHTML).toBe(name);

        });

        it('actualizar should update the message list ', () => {
            const chat: ChatService = fixture.debugElement.injector.get(ChatService);
            //spyOn(chat, 'actualizar');
            //spyOn(chat, 'order');
            component.actualizar();
            expect (component.messages).toEqual([]);
            //expect(chat.actualizar).toHaveBeenCalledTimes(1);

        });



    });

});
