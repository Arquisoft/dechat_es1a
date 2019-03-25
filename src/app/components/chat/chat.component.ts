import {Component, OnInit} from '@angular/core';
import {RdfService} from '../../services/rdf.service';
import {Friend} from '../../models/friend.model';
import {ToastrService} from 'ngx-toastr';
import {ChatService} from '../../services/chat.service';
import {message} from '../../models/message.model';

declare var require: any;

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


    mi_listado_de_friends: string[] = [];
    username = '';
    fileClient: any;
    ruta_seleccionada: string;
    messages: message[] = [];
    ruta: string;

    constructor(private rdf: RdfService, private toastr: ToastrService, private chat: ChatService) {
    }

    ngOnInit() {
        this.chat.loadFriends().then(res => {
            if(res.length ==  0)
            {
                document.write('You don\'t have friends to chat');
            }
            else {
                document.getElementById('receiver').innerHTML = this.getUserByUrl(res[0]);
                this.mi_listado_de_friends = res;
                this.ruta_seleccionada = res[0];
            }

        });
        this.fileClient = require('solid-file-client');

      //  document.getElementById('receiver').innerHTML = this.mi_listado_de_friends;
    }


    initSelection(ruta) {
        this.ruta_seleccionada = ruta;
        const name = this.getUserByUrl(this.ruta_seleccionada);
        this.createNewFolder('dechat1a', '/public/');
        this.createNewFolder(name, '/public/dechat1a/');
        document.getElementById('receiver').innerHTML = name;
    }

    /**
     * Crear carpeta
     * @param name
     * @param ruta
     */
    private createNewFolder(name: string, ruta: string) {
        //Para crear la carpeta necesito una ruta que incluya el nombre de la misma.
        //Obtengo el ID del usuario y sustituyo  lo irrelevante por la ruta de public/NombreCarpeta
        let solidId = this.rdf.session.webId;
        const stringToChange = '/profile/card#me';
        const path = ruta + name;
        solidId = solidId.replace(stringToChange, path);
        //Necesito logearme en el cliente para que me de permiso, sino me dara un error al intentar
        //crear la carpeta. Como ya estoy en sesion no abre nada pero si se abre la consola se ve
        // que se ejecuta correctamente.
        this.buildFolder(solidId);
    }

    //method that creates the folder using the solid-file-client lib
    private buildFolder(solidId) {
        this.fileClient.readFolder(solidId).then(folder => {
            console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
        }, err => {
            //Le paso la URL de la carpeta y se crea en el pod. SI ya esta creada no se si la sustituye o no hace nada
            this.fileClient.createFolder(solidId).then(success => {
                console.log(`Created folder ${solidId}.`);
            }, err1 => console.log(err1));
        });
    }

    crateFolder() {
        const user = this.getUserByUrl(this.ruta_seleccionada);
        const path = '/public/dechat2a/' + user + '/Conversation.txt';
        let senderId = this.rdf.session.webId;
        const stringToChange = '/profile/card#me';
        senderId = senderId.replace(stringToChange, path);
        const urlArray = this.ruta_seleccionada.split('/');
    }

    async actualizar(item) {
        this.initSelection(item);
        this.ruta_seleccionada = item.toString();
        console.log(this.ruta_seleccionada);
        this.messages = [];
        const user = this.getUserByUrl(this.ruta_seleccionada);
        let senderId = this.rdf.session.webId;
        const stringToChange = '/profile/card#me';
        const path = '/public/dechat1a/' + user + '/Conversation.txt';
        senderId = senderId.replace(stringToChange, path);
        this.ruta = senderId;
        console.log('SENDERID:        ' + senderId);
        const content = await this.readMessage(senderId);
        const messageArray = content.split('\n');
        messageArray.forEach(element => {
            console.log(element.content);
            if (element[0]) {
                const messageArrayContent = element.split('###');
                const messageToAdd: message = {
                    content: messageArrayContent[2],
                    date: messageArrayContent[3],
                    sender: messageArrayContent[0],
                    recipient: messageArrayContent[1]
                };
                console.log(messageToAdd);
                this.messages.push(messageToAdd);
            }
        });

    }

    private async readMessage(url) {
        this.ruta = url;
        const message = await this.searchMessage(url);
        return message;
    }

    //method that search for a message in a pod
    private async searchMessage(url) {
        console.log('URL: ' + url);
        return await this.fileClient.readFile(url).then(body => {
            console.log(`File	content is : ${body}.`);
            return body;
        }, err => console.log(err));

    }

    private getUserByUrl(ruta: string): string {
        let sinhttp;
        sinhttp = ruta.replace('https://', '');
        const user = sinhttp.split('.')[0];
        return user;
    }

    private updateTTL(url, newContent, contentType?) {
        if (contentType) {
            this.fileClient.updateFile(url, newContent, contentType).then(success => {
                console.log(`Updated ${url}.`);
            }, err => console.log(err));
        } else {
            this.fileClient.updateFile(url, newContent).then(success => {
                console.log(`Updated ${url}.`);
            }, err => console.log(err));
        }
    }


    async write() {

        let myUser = this.getUserByUrl(this.rdf.session.webId);
        let user = this.getUserByUrl(this.ruta_seleccionada);
        var messageContent = (<HTMLInputElement>document.getElementById("comment")).value;

  /*      //(document.getElementById("usermsg") as HTMLInputElement).value = "";
        console.log("MY USER:          " + myUser);
        console.log("RECEIVER:         " + this.ruta_seleccionada);
        console.log("MESSAGE CONTENT   " + messageContent);
*/

        let senderId = this.rdf.session.webId;
        let senderPerson: Friend = {webid: senderId, name: this.getUserByUrl(senderId)};

        //Receiver WebId
        let recipientPerson: Friend = {webid: this.ruta_seleccionada, name: this.getUserByUrl(this.ruta_seleccionada)};

        let messageToSend: message = {content: messageContent, date: new Date(Date.now()), sender: senderPerson, recipient: recipientPerson};

         console.log(messageToSend);
    }
}
