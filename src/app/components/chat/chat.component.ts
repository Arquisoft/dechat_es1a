import {Component, OnInit} from '@angular/core';
import {RdfService} from '../../services/rdf.service';
import {Friend} from '../../models/friend.model';
import {ToastrService} from 'ngx-toastr';
import {ChatService} from '../../services/chat.service';
import {message} from '../../models/message.model';

declare var require: any;
declare let $rdf;

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


    mi_listado_de_friends: string[] = [];
    fileClient: any;
    ruta_seleccionada: string;
    messages: message[] = [];
    ruta: string;

    constructor(private rdf: RdfService, private toastr: ToastrService, private chat: ChatService) {
    }

    ngOnInit() {
        this.chat.loadFriends().then(res => {
            if (res.length ==  0) {
                document.write('You don\'t have friends to chat');
            } else {
                document.getElementById('receiver').innerHTML = this.getUserByUrl(res[0]);
                this.mi_listado_de_friends = res;
                this.ruta_seleccionada = res[0];
                this.chat.initChat(this.getUserByUrl(this.ruta_seleccionada));
            }
        });
        this.fileClient = require('solid-file-client');
        setInterval(() => {
            this.actualizar();
        }, 3000);
    }


    initSelection(ruta) {
        this.messages = [];
        this.ruta_seleccionada = ruta;
        this.chat.initChat(this.getUserByUrl(this.ruta_seleccionada));
        document.getElementById('receiver').innerHTML = name;
    }

    async actualizar() {
        var messages = await this.chat.actualizar(this.ruta_seleccionada);
        if (messages.length != this.messages.length) {
            this.messages = [];
            this.messages = messages;
            this.messages = this.order(this.messages);
        }
    }

 
    /*
    * Sorted methos that sorts the message array
    */
    public order( mess : message[] )
    {
        return mess.sort(function(a, b) {
            let date1 = a.date;
            let date2 = b.date;
            return date2>date1 ? -1 : date2<date1 ? 1 : 0;
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


    private getMessage(quads: any[], idx: number): message {
        return {
            date: this.getValue(quads[idx + 1]),
            content: this.getValue(quads[idx + 2]),
            sender: this.getValue(quads[idx + 3]),
            recipient: this.getValue(quads[idx + 4])
        };
    }

    private getValue(elem: any): any {
        return elem.object.value;
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
        const user = this.getUserByUrl(this.ruta_seleccionada);
        const messageContent = (<HTMLInputElement>document.getElementById('comment')).value;
        (document.getElementById('comment') as HTMLInputElement).value = '';
        let senderId = this.rdf.session.webId;
        const senderPerson: Friend = {webid: senderId, name: this.getUserByUrl(senderId)};
        //Receiver WebId
        const recipientPerson: Friend = {webid: this.ruta_seleccionada, name: this.getUserByUrl(this.ruta_seleccionada)};
        const messageToSend: message = {content: messageContent, date: new Date(Date.now()), sender: senderPerson, recipient: recipientPerson};
        const stringToChange = '/profile/card#me';
        const path = '/public/dechat1a/' + user + '/prueba.ttl';
        senderId = senderId.replace(stringToChange, path);
        const message = await this.readMessage(senderId);
        this.ruta = senderId;
        if (message != null) {
            this.updateTTL(senderId, message + '\n' + new Printer().writeTTLMessage(this.rdf.session.webId, this.ruta_seleccionada, messageToSend));
            if (this.messages.indexOf(message) !== -1) {
                this.messages.push(message);
            }
        } else {
            this.updateTTL(senderId, new Printer().writeTTL(this.rdf.session.webId, this.ruta_seleccionada, messageToSend));
        }
    }

    getProfilePicture(user) {
        const a = user.toString().replace('card#me', 'perfil.jpeg');
        return a;
    }
}

class Printer {
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
}
