import {Injectable} from '@angular/core';
import {Friend} from '../models/friend.model';
import {RdfService} from './rdf.service';
import {ToastrService} from 'ngx-toastr';

declare var require: any;
import solid_file_client from 'solid-file-client';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    chatController: any;
    solidFileClient: any;
    username = '';
    // https://jonivalles.solid.community/public/deChatES1A/sofimrtn.
    solidId = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA11/' + this.username);
    // https://jonivalles.solid.community/public/deChatES1A/sofimrtn/XXXXXX (Inside folder)
    solidIdFolder = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA11/' + this.username + '/' + this.username);
    messageText = '';
    mi_listado_de_friends: string[] = [];


    constructor(private rdf: RdfService, private toastr: ToastrService) {
        this.solidFileClient = require('solid-file-client');
    }

    /**
     * get user's friends from rdf
     */

    async loadFriends(): Promise<string[]> {
        this.mi_listado_de_friends = [];
        let list_friends = this.mi_listado_de_friends;

        try {
            list_friends = await this.rdf.getFriends(); // returns an array of urls
            console.log(list_friends);
            if (list_friends) {
                for (let i = 0; i < list_friends.length; i++) {
                    this.mi_listado_de_friends.push(list_friends[i]);
                }
            }
            return this.mi_listado_de_friends;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }


}
