import {Component, OnInit} from '@angular/core';
import {RdfService} from '../services/rdf.service';
import {ToastrService} from 'ngx-toastr';
import {ChatService} from '../services/chat.service';
import {message} from '../models/message.model';
declare var require: any;
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
            this.messages = this.chat.order(this.messages);
        }
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
        var message = await this.chat.write(senderId, this.ruta_seleccionada, messageContent, user);
        if (this.messages.indexOf(message) !== -1) {
            this.messages.push(message);
        }
    }
    getProfilePicture(user) {
        const a = user.toString().replace('card#me', 'perfil.jpeg');
        return a;
    }
}
