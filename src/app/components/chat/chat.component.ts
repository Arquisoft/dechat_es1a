import {Component, OnInit} from '@angular/core';
import {RdfService} from '../../services/rdf.service';
import {Friend} from '../../models/friend.model';
import {ChatController} from './chatController';
import {ToastrService} from 'ngx-toastr';
import {ChatService} from '../../services/chat.service';
import {Message} from '../../models/message.model';

declare var require: any;

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


    mi_listado_de_friends: Friend[] = [];
    username = '';
    isHidden = false;
    messageText = '';


    constructor(private rdf: RdfService, private toastr: ToastrService, private chat: ChatService) {
    }

    ngOnInit() {
        this.chat.loadFriends().then(res => {
            this.mi_listado_de_friends = res;
        });
        this.chat.createBaseFolder();

    }

    startConversation(name: string) {
        this.isHidden = true;
        this.chat.startConversation(name);
    }

    updateFile(name: string, text: string) {
        this.chat.updateFile(name, text);
    }

    protected sendMessage(name: string) {

        this.chat.sendMessage(name);
    }

    protected readFile(name: string) {

        this.messageText = this.chat.readFile(name);

    }


}
