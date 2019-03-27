



// do not import any other than you test. For others, mock it


import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

import * as $rdf from 'rdflib';
import {ChatService} from '../src/app/services/chat.service';



const mockFriends = {
    DUB: { name: 'Dublin' },
    WRO: { name: 'Wroclaw' },
    MAD: { name: 'Madrid' }
};

describe('Service: SampleService', () => {
    let httpMock: HttpTestingController;
    let service: ChatService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                ChatService
            ]
        });
    });

    beforeEach(
        inject([ChatService, HttpTestingController], (_service, _httpMock) => {
            service = _service;
            httpMock = _httpMock;
        }));

    it('loadFriends: should return list', async function() {
        const friends = await service.loadFriends();
            expect(friends.length).toBe(3);
            expect(friends[length - 1]).toBe('MAD');
        });

        const req = httpMock.expectOne('https://foo.bar.com/airports');

        req.flush(mockFriends);
        httpMock.verify();
    });


