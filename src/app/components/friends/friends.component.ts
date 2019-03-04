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
      const list_friends = await this.rdf.getFriends();
      const list_names = await this.rdf.getFriendsNames();
      if (list_friends) {
        document.write('<h1>These are my friends</h1>');
        for (let i = 0; i < list_friends.length; i++) {
          document.write('<a href='list_friends[i]'>'list_friends[i]'</a><br>');
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

}
