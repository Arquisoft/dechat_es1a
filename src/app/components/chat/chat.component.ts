import { Component, OnInit } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { Friend } from '../../models/friend.model';
import { ChatController } from './chatController';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from '../../services/chat.service';
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


    constructor(private rdf: RdfService, private toastr: ToastrService, private chat: ChatService) { }

    ngOnInit() {
        this.loadFriends();

    }

    /**
     * get user's friends from rdf
     */
    async loadFriends() {

        this.chat.loadFriends();
        this.mi_listado_de_friends = this.chat.mi_listado_de_friends;
    }

    /**
     * Method that creates a folder where our app will write our persistence
     */
    private createNewFolder() {
        this.chat.createNewFolder();
    }

    // Crea un fichero nuevo si no existe, sino lo deja tal cual
    // El metodo "startConversation" crea indefinidos ficheros con un numero distinto
    protected startConversation(name: string) {
        this.chat.startConversation(name);
    }

    protected updateFile(name: string, text: string) {

        this.chat.updateFile(name, text);

    }

    protected sendMessage(name: string) {

       this.chat.sendMessage(name);

    }

    protected readFile(name: string) {

        this.messageText = this.chat.readFile(name);

    }


    protected createPermissions(route: string, user: string) {
       this.chat.createPermissions(route, user);

    }



}
