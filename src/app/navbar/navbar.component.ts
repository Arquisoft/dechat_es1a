import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/solid.auth.service';
import { RdfService } from '../services/rdf.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private rdf: RdfService) { }

  ngOnInit() {
  }

  // Example of logout functionality. Normally wouldn't be triggered by clicking the profile picture.
  logout() {
    this.auth.solidSignOut();
  }

  async loadFriends() {
    try {
      const list_friends = await this.rdf.getFriends();
      //const list_names = await this.rdf.getFriendsNames();
      if (list_friends) {
        document.write("<h1>These are my friends</h1>");
        for (let i = 0; i < list_friends.length; i++) {
          document.write("<a href='list_friends[i]'>" + list_friends[i] + "</a><br>");
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }


}
