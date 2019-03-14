import {Component, OnInit} from '@angular/core';
import {RdfService} from '../../services/rdf.service';
import {Friend} from '../../models/friend.model';
//import { ChatController} from './chatController';
import {ToastrService} from 'ngx-toastr';

declare var require: any;

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    mi_listado_de_friends: Friend[] = [];
    solidFileClient: any;
    private toastr: any;

    constructor(private rdf: RdfService) {
    }

    ngOnInit() {
        this.loadFriends();
        this.solidFileClient = require('solid-file-client');
        // this.createChat();
    }

    /*
   get user's friends from rdf.
    */
    async loadFriends() {
        let list_friends;
        try {
            list_friends = await this.rdf.getFriends(); // returns an array of urls
            console.log(list_friends);
            if (list_friends) {
                for (let i = 0; i < list_friends.length; i++) {
                    const names = this.parseURL(list_friends[i]);
                    const amigo: Friend = {name: names, url: list_friends[i]};
                    this.mi_listado_de_friends.push(amigo);
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    /*
    get names from friend's url.
     */
    parseURL(url: string): string {
        const sinHttps = url.replace('https://', '');
        const name = sinHttps.split('.')[0];
        return name;
    }

    /*async createChat() {
      const id = this.rdf.getSession();
      this.chat.newChat(id);
    }*/

    private createNewFolder() {

        let solidId = this.rdf.session.webId;
        solidId = solidId.replace('/profile/card#me', '/public/deChatES1A');

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        // We must check that the folder not exists before create it
        this.solidFileClient.createFolder(solidId).then(success => {
            console.log(`Created folder ${solidId}.`);
        }, err => console.log(err));

    }

    private createFile(folder: string, user: string) {
        let solidId = this.rdf.session.webId;
        solidId = solidId.replace('/profile/card#me', '/public/deChatES1A');
        folder = solidId;
        user = 'sofimrtn.solid-community';
    }
}
