import { Friend } from "./friend.model";

export class message {
    content: string;
    date: Date;
    sender: Friend;
    recipient: Friend;
}

