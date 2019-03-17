
import {ChatService} from "../src/app/services/chat.service";


const chat = new ChatService();
const WebID = "https://test1a.solid.community/profile/card#me";

describe("Obtaining Friend List", function () {

        it("Gets friends names", async function(){
            const listOfFriends = await chat.loadFriends();
            expect(friends.length).toBe(1);
            expect(friends[friends.length -1].id).toBe("https://yagoprado.solid.community/profile/card#me");
        })
})

describe("Create new Folder", function () {

    it("Gets friends names", async function(){
        const listOfFriends = await chat.loadFriends();
        expect(friends.length).toBe(1);
        expect(friends[friends.length -1].id).toBe("https://yagoprado.solid.community/profile/card#me");
    })
})
