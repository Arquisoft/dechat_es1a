import { Friend } from "./friend.model";
import { Content, Variable } from "@angular/compiler/src/render3/r3_ast";


export class message{

    content: string;
    date: Date;
    sender: Friend;
    recipient: Friend;
}
