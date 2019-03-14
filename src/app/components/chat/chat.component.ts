import { Component, OnInit } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { Friend } from '../../models/friend.model';
// import { ChatController} from './chatController';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private rdf: RdfService, private toastr: ToastrService) { }

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
            this.toastr.success('Folder created!', 'Success!');
        }, err => console.log(err) );

    }

    // Crea un fichero nuevo si no existe, sino lo deja tal cual
    // El metodo "createFile" crea indefinidos ficheros con un numero distinto
    protected createFile(name: string) {

        let solidId = this.rdf.session.webId;
        solidId = solidId.replace('/profile/card#me', '/public/deChatES1A/' + name);

        this.solidFileClient.popupLogin().then( webId => {
            console.log( `Logged in as ${webId}.`);
        }, err => console.log(err) );

        this.isHidden = true;
        this.username = name;
        // Es necesario que este la carpeta creada antes de ejecutarse sino dara un error
        this.createNewFolder();
        this.solidFileClient.updateFile(solidId).then(success => {
            console.log(`Created file ${solidId}.`);
            this.toastr.success('File created!', 'Success!');
        }, err => console.log(err) );

    }

}
