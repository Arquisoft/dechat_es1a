import { Component, OnInit } from '@angular/core';
import { RdfService } from '../../services/rdf.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private rdf: RdfService) { }

  ngOnInit() {
    this.loadFriends();
  }

  async loadFriends() {
    try {
      const list_friends = await this.rdf.getFriends(); //devuelve un array de urls
      if (list_friends) {
        for (let i = 0; i < list_friends.length; i++) {
          return list_friends[i];
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

}
