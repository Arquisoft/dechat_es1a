import { Injectable } from '@angular/core';
import {Friend} from '../models/friend.model';
import { RdfService } from './rdf.service';
import { ToastrService } from 'ngx-toastr';
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
  solidId = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA3/' + this.username);
  // https://jonivalles.solid.community/public/deChatES1A/sofimrtn/XXXXXX (Inside folder)
  solidIdFolder = this.rdf.session.webId.replace('/profile/card#me', '/public/PRUEBA3/' + this.username + '/' + this.username);
  isHidden = false;
  messageText = '';
  mi_listado_de_friends: Friend[] = [];



  constructor(private rdf: RdfService, private toastr: ToastrService) {
    this.solidFileClient = require('solid-file-client');
    this.chatController = new ChatController(this.solidFileClient);
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
  private parseURL(url: string): string {
    const sinHttps = url.replace('https://', '');
    const name = sinHttps.split('.')[0];
    return name;
  }

  /*async createChat() {
    const id = this.rdf.getSession();
    this.chat.newChat(id);
  }*/

  /**
   * Method that creates a folder where our app will write our persistence
   */
  createNewFolder() {

    this.solidFileClient.popupLogin().then(webId => {
      console.log(`Logged in as ${webId}.`);
    }, err => console.log(err));

    // We must check that the folder not exists before create it
    this.solidFileClient.createFolder(this.solidId).then(success => {
      console.log(`Created folder ${this.solidId}.`);
      this.toastr.success('Folder created!', 'Success!');
    }, err => console.log(err) );

  }

  // Crea un fichero nuevo si no existe, sino lo deja tal cual
  // El metodo "startConversation" crea indefinidos ficheros con un numero distinto
    async startConversation(name: string) {
    // const body = this.readFile(this.username);

    this.solidFileClient.popupLogin().then( webId => {
      console.log( `Logged in as ${webId}.`);
    }, err => console.log(err) );

    this.isHidden = true;
    this.username = name;
    // Es necesario que este la carpeta creada antes de ejecutarse sino dara un error
    this.createNewFolder();
    // this.createPermissions(this.solidIdFolder, this.username);

    // Borra el fichero pisando lo anterior CUIDADO TODO
    await this.solidFileClient.updateFile(this.solidId + this.username + 'Chat').then(success => {
      console.log(`Created file ${this.solidId + this.username + 'Chat'}.`);
      this.toastr.success('File created!', 'Success!');
    }, err => console.log(err) );
    // this.chatController.grantPermissions(this.solidIdFolder + 'ACL', name);
  }

  updateFile(name: string, text: string) {

    this.solidFileClient.popupLogin().then( webId => {
      console.log( `Logged in as ${webId}.`);
    }, err => console.log(err) );

    this.solidFileClient.updateFile(this.solidIdFolder + 'Chat').then(success => {
      console.log(`Updated file ${this.solidIdFolder + 'Chat'}.`);
      this.toastr.success('Fichero actualizado!', 'Success!');
    }, err => console.log(err) );

  }

  sendMessage(name: string) {

    const body = this.readFile(this.username);

    this.solidFileClient.popupLogin().then( webId => {
      console.log( `Logged in as ${webId}.`);
    }, err => console.log(err) );

    this.solidFileClient.updateFile(this.solidId, body + this.messageText + '\n').then(success => {
      console.log(`Mensaje enviado ` + this.messageText);
      this.toastr.success('Mensaje enviado!', 'Success!');
    }, err => console.log(err) );

  }

  readFile(name: string): string {

    this.solidFileClient.popupLogin().then( webId => {
      console.log( `Logged in as ${webId}.`);
    }, err => console.log(err) );

    this.solidFileClient.readFile(this.solidIdFolder).then(body => {
      body.slice(0, 8);
      console.log(`File content is : ${body}.`);
      this.toastr.success('Fichero leido!', 'Success!');
      return body;
    }, err => console.log(err));
    return null;

  }


  createPermissions(route: string, user: string) {
    const aclRoute = route + '.acl';
    const acl = this.chatController.generateACL(aclRoute, user + 'ACL');

    this.solidFileClient.updateFile(aclRoute, acl).then(success => {
      console.log( `ACL creado`);
    }, err => this.solidFileClient.createFile(aclRoute, acl).then(200));

  }
}
