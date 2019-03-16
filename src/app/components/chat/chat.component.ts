import {Component, OnInit} from '@angular/core';
import {RdfService} from '../../services/rdf.service';
import {Friend} from '../../models/friend.model';
import {ChatController} from './chatController';
import {ToastrService} from 'ngx-toastr';
import {Message} from '../../models/message.model';

declare var require: any;

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    mi_listado_de_friends: Friend[] = [];
    solidFileClient: any;
    username = '';
    isHidden = false;
    messageText = '';
    mensajes: Message[] = [];
    chatController: any;
    solidId = '';
    solidIdFolder = '';
    // https://jonivalles.solid.community/public/deChatES1A/sofimrtn.
//  solidId = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA5/' + this.username);
    // https://jonivalles.solid.community/public/deChatES1A/sofimrtn/XXXXXX (Inside folder)
//  solidIdFolder = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA5/' + this.username + '/' + this.username);


    constructor(private rdf: RdfService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.loadFriends();
        this.solidFileClient = require('solid-file-client');
        this.chatController = new ChatController(this.solidFileClient);
        this.createBaseFolder();
    }

    /**
     * get user's friends from rdf
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

    /**
     * get names from friend's url
     * @param url
     */
    parseURL(url: string): string {
        const sinHttps = url.replace('https://', '');
        const name = sinHttps.split('.')[0];
        return name;
    }

    private createURL(friendName: String) {
        this.solidIdFolder = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA7/' + friendName + '/');
    }

    /**
     * Creates the base folder for the app
     */
    private createSolidId() {
        this.solidId = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA7/');
    }

    private createBaseFolder() {
        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.createSolidId();
        this.solidFileClient.createFolder(this.solidId).then(success => {
            console.log(`Created folder ${this.solidId}.`);
            this.toastr.success('Folder created!', 'Success!');
        }, err => console.log(err));

        this.createBasePermissions(this.solidId);
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

    // Crea un fichero nuevo si no existe, sino lo deja tal cual
    // El metodo "startConversation" crea indefinidos ficheros con un numero distinto
    protected async startConversation(name: string) {
        // const body = this.readFile(this.username);

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.isHidden = true;
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

    protected updateFile(name: string, text: string) {

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.solidFileClient.updateFile(this.solidIdFolder + 'Chat').then(success => {
            console.log(`Updated file ${this.solidIdFolder + 'Chat'}.`);
            this.toastr.success('Fichero actualizado!', 'Success!');
        }, err => console.log(err));

    }

    protected sendMessage(name: string) {

        const body = this.readFile(this.username);

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.solidFileClient.updateFile(this.solidId, body + this.messageText + '\n').then(success => {
            console.log(`Mensaje enviado ` + this.messageText);
            this.toastr.success('Mensaje enviado!', 'Success!');
        }, err => console.log(err));

    }

    protected readFile(name: string) {

        this.solidFileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`);
        }, err => console.log(err));

        this.solidFileClient.readFile(this.solidIdFolder).then(body => {
            body.slice(0, 8);

            this.messageText = body;
            console.log(`File content is : ${body}.`);
            this.toastr.success('Fichero leido!', 'Success!');
        }, err => console.log(err));

    }

    protected createBasePermissions(route: string) {
        console.log(route);
        const aclRoute = route + '.acl';
        console.log(aclRoute);
        const acl = this.chatController.grantBasePermissions(aclRoute);

        this.solidFileClient.updateFile(aclRoute, acl).then(success => {
            console.log('ACL created');
        }, err => this.solidFileClient.createFile(aclRoute, acl).then(200));
    }

    protected createPermissions(route: string, user: string) {
        console.log(route);
        const aclRoute = route + '.acl';
        console.log(aclRoute);
        const acl = this.chatController.grantPermissions(aclRoute, user);

        this.solidFileClient.updateFile(aclRoute, acl).then(success => {
            console.log('ACL created');
        }, err => this.solidFileClient.createFile(aclRoute, acl).then(200));
    }
}
