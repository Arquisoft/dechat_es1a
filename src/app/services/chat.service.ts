import {Injectable} from '@angular/core';
import {Friend} from '../models/friend.model';
import {RdfService} from './rdf.service';
import {ToastrService} from 'ngx-toastr';
import {ChatController} from '../components/chat/chatController';

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
    solidId = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA10/' + this.username);
    // https://jonivalles.solid.community/public/deChatES1A/sofimrtn/XXXXXX (Inside folder)
    solidIdFolder = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA10/' + this.username + '/' + this.username);
    messageText = '';
    mi_listado_de_friends: Friend[] = [];


    constructor(private rdf: RdfService, private toastr: ToastrService) {
        this.solidFileClient = require('solid-file-client');
        this.chatController = new ChatController(this.solidFileClient);
    }

    /**
     * get user's friends from rdf
     */

    async loadFriends(): Promise<Friend[]> {
        let list_friends;
        this.mi_listado_de_friends = [];
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
            return this.mi_listado_de_friends;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    /**
     * get names from friend's url
     * @param url
     */
    private parseURL(url: string): string {
        const sinHttps = url.replace('https://', '');
        const name = sinHttps.split('.')[0];
        return name;
    }

    /**
     * Creates the base folder for the app
     */
    createBaseFolder() {
        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.createSolidId();
        this.solidFileClient.createFolder(this.solidId).then(success => {
            console.log(`Created folder ${this.solidId}.`);
            this.toastr.success('Folder created!', 'Success!');
        }, err => console.log(err));

        this.createPermissions(this.solidId, this.username);
    }

    private createSolidId() {
        this.solidId = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA10/');
    }


    // Crea un fichero nuevo si no existe, sino lo deja tal cual
    // El metodo "startConversation" crea indefinidos ficheros con un numero distinto
    async startConversation(name: string) {
        // const body = this.readFile(this.username);

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.createURL(name);
        // Es necesario que este la carpeta creada antes de ejecutarse sino dara un error
        this.createNewFolder();

        let friendURL: string;
        for (let i = 0; i < this.mi_listado_de_friends.length; i++) {
            if (name === this.mi_listado_de_friends[i].name) {
                friendURL = (this.mi_listado_de_friends[i].url);
            }
        }
        this.createPermissions(this.solidIdFolder, friendURL);
        this.chatController.grantPermissions(this.solidIdFolder + name + 'Chat', friendURL);

        // Borra el fichero pisando lo anterior CUIDADO TODO
        await this.solidFileClient.updateFile(this.solidIdFolder + name + 'Chat').then(success => {
            console.log(`Created file ${this.solidIdFolder + name + 'Chat'}.`);
            this.toastr.success('File created!', 'Success!');
        }, err => console.log(err));
        console.log(this.solidIdFolder);
    }

    /**
     * Creates the permissions for the base folder of the app
     * @param route
     */
    private createBasePermissions(route: string) {
        console.log(route);
        const aclRoute = route + '.acl';
        console.log(aclRoute);
        const acl = this.chatController.grantBasePermissions(aclRoute);

        this.solidFileClient.updateFile(aclRoute, acl).then(success => {
            console.log('ACL created');
        }, err => this.solidFileClient.createFile(aclRoute, acl).then(200));
    }

    private createPermissions(route: string, user: string) {
        const aclRoute = route + '.acl';
        const acl = this.chatController.generateACL(aclRoute, user);

        this.solidFileClient.updateFile(aclRoute, acl).then(success => {
            console.log(`ACL creado`);
        }, err => this.solidFileClient.createFile(aclRoute, acl).then(200));

    }

    /**
     * Method that creates a folder where our app will write our persistence
     */
    private createNewFolder() {

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.solidFileClient.createFolder(this.solidIdFolder).then(success => {
            console.log(`Created folder ${this.solidIdFolder}.`);
            this.toastr.success('Folder created!', 'Success!');
        }, err => console.log(err));
    }


    updateFile(name: string, text: string) {

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.solidFileClient.updateFile(this.solidIdFolder + 'Chat').then(success => {
            console.log(`Updated file ${this.solidIdFolder + 'Chat'}.`);
            this.toastr.success('Fichero actualizado!', 'Success!');
        }, err => console.log(err));

    }

    sendMessage(name: string) {

        const body = this.readFile(this.username);

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.solidFileClient.updateFile(this.solidId, body + this.messageText + '\n').then(success => {
            console.log(`Mensaje enviado ` + this.messageText);
            this.toastr.success('Mensaje enviado!', 'Success!');
        }, err => console.log(err));

    }

    readFile(name: string): string {

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.solidFileClient.readFile(this.solidIdFolder).then(body => {
            body.slice(0, 8);

            this.messageText = body;
            console.log(`File content is : ${body}.`);
            this.toastr.success('Fichero leido!', 'Success!');
            return body;

        }, err => console.log(err));
        return null;

    }


    private createURL(friendName: String) {
        this.solidIdFolder = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA10/' + friendName + '/');
    }
}
