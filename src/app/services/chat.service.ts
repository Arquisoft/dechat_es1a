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
    /**
     * Crear carpeta
     * @param name
     * @param ruta
     */
    createNewFolder(name: string, ruta: string) {
        let solidId = this.rdf.session.webId;
        const stringToChange = '/profile/card#me';
        const path = ruta + name;
        solidId = solidId.replace(stringToChange, path);
        this.buildFolder(solidId);
    }
    //method that creates the folder using the solid-file-client lib
    private buildFolder(solidId) {
        this.solidFileClient.readFolder(solidId).then(folder => {
            console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
        }, err => {
            //Le paso la URL de la carpeta y se crea en el pod. SI ya esta creada no se si la sustituye o no hace nada
            this.solidFileClient.createFolder(solidId).then(success => {
                console.log(`Created folder ${solidId}.`);
            }, err1 => console.log(err1));
        });
    }
    public writeTTL(sender, recipient, newMessage) {
        return '@prefix schem: <http://schema.org/> .\n' +
            '@prefix : <#> .\n\n' +
            this.writeTTLMessage(sender, recipient, newMessage);

    }
    public writeTTLMessage(sender, recipient, message) {
        return ':message' + this.getMessageId(message) + ' a schem:Message ;\n\n' +
            '\tschem:dateSent "' + message.date + '" ;\n' +
            '\tschem:messageAttachment "' + message.content + '" ;\n' +
            '\tschem:sender "' + sender + '" ;\n' +
            '\tschem:recipient "' + recipient + '" .\n' ;
    }

    public getMessageId(message) {
        const date = message.date.getFullYear().toString() + message.date.getMonth().toString() + message.date.getDay().toString() + message.date.getHours().toString() + message.date.getMinutes().toString() +
            message.date.getSeconds().toString() + message.date.getMilliseconds().toString();
        return date;
    }

    updateTTL(url, newContent, contentType?) {
        if (contentType) {
            this.solidFileClient.updateFile(url, newContent, contentType).then(success => {
                console.log(`Updated ${url}.`);
            }, err => console.log(err));
        } else {
            this.solidFileClient.updateFile(url, newContent).then(success => {
                console.log(`Updated ${url}.`);
            }, err => console.log(err));
        }
    }
    getUserByUrl(ruta: string): string {
        return ruta.replace('https://', '').split('.')[0];
    }

    initChat(name) {
        this.createNewFolder('dechat1a', '/public/');
        this.createNewFolder(name, '/public/dechat1a/');
    }

    async readMessage(url) {
        return await this.searchMessage(url);
    }

    async searchMessage(url) {
        return await this.solidFileClient.readFile(url).then(body => {
            console.log(`File	content is : ${body}.`);
            return body;
        }, err => console.log(err));
    }
}
