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
                const name = this.getUserByUrl(this.ruta_seleccionada);
                this.chat.createNewFolder('dechat1a', '/public/');
                this.chat.createNewFolder(name, '/public/dechat1a/');
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
        const name = this.getUserByUrl(this.ruta_seleccionada);
        this.chat.createNewFolder('dechat1a', '/public/');
        this.chat.createNewFolder(name, '/public/dechat1a/');
        document.getElementById('receiver').innerHTML = name;
    }

    async actualizar() {
        const messages: message []  = [];
        try {
            const user = this.getUserByUrl(this.ruta_seleccionada);
            let senderId = this.rdf.session.webId;
            const stringToChange = '/profile/card#me';
            const path = '/public/dechat1a/' + user + '/prueba.ttl';
            senderId = senderId.replace(stringToChange, path);


            const contentSender = await this.readMessage(senderId);

            if (!(contentSender === undefined)) {
                const doc = $rdf.sym(senderId);
                const store = $rdf.graph();
                const e = await this.searchMessage(doc.value);
                const par = $rdf.parse(e, store, doc.uri, 'text/turtle');
                const quads = store.match(null, null, null, doc);
                let i;
                for (i = 0; i < quads.length; i += 5) {
                    messages.push(this.getMessage(quads, i));
                }
            }

            const urlArray = this.ruta_seleccionada.split('/');
            const url = 'https://' + urlArray[2] + '/public/dechat1a/' + this.getUserByUrl(this.rdf.session.webId) + '/prueba.ttl';
            const contentReceiver = await this.readMessage(url);


            console.log('CONTENT RECEIVER: ' + url);

            if (!(contentReceiver === undefined)) {
                const doc2 = $rdf.sym(url);
                const store2 = $rdf.graph();
                const e2 = await this.searchMessage(doc2.value);
                const par2 = $rdf.parse(e2, store2, doc2.uri, 'text/turtle');
                const quads2 = store2.match(null, null, null, doc2);
                let i;
                for (i = 0; i < quads2.length; i += 5) {
                    messages.push(this.getMessage(quads2, i));
                }
            }

            if (messages.length != this.messages.length) {
                this.messages = [];
                this.messages = messages;
                this.messages = this.order(this.messages);
            }

        } catch (err) {
            console.log('impossible to print the message');
        }
    }


    /*
    * Sorted methos that sorts the message array
    */
    public order( mess: message[] ) {
        return mess.sort(function(a, b) {
            const date1 = a.date;
            const date2 = b.date;
            return date2 > date1 ? -1 : date2 < date1 ? 1 : 0;
        });
    }

    private async readMessage(url) {
        this.ruta = url;
        return await this.searchMessage(url);
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
            this.chat.updateTTL(senderId, message + '\n' + this.chat.writeTTLMessage(this.rdf.session.webId, this.ruta_seleccionada, messageToSend));
            if (this.messages.indexOf(message) !== -1) {
                this.messages.push(message);
            }
        } else {
            this.updateTTL(senderId, this.chat.writeTTL(this.rdf.session.webId, this.ruta_seleccionada, messageToSend));
        }
    }

    getProfilePicture(user) {
        const a = user.toString().replace('card#me', 'perfil.jpeg');
        return a;
    }
}
