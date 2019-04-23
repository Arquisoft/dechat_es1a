import {ChatService} from './chat.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestBed} from '@angular/core/testing';
import {RdfService} from './rdf.service';


describe('ChatService', () => {
    const rdfServiceStub = {
        getProfile: () => ({}),
        getFriends: async () => ['fooFriend1', 'fooFriend2']
    };



    beforeEach(() => TestBed.configureTestingModule({
        imports: [ ToastrModule.forRoot(), BrowserAnimationsModule ],
        providers: [ ChatService, { provide: RdfService, useValue: rdfServiceStub } ]
    }));

    it('should be created', () => {
        const service: ChatService = TestBed.get(ChatService);
        expect(service).toBeTruthy();

    });

    it('loadFriends method should call RdfService', () => {
        const service: ChatService = TestBed.get(ChatService);
        service.actualizar('https://fooroute');
        expect(service.loadFriends()).resolves.toEqual(['fooFriend1', 'fooFriend2']);
    });


});
