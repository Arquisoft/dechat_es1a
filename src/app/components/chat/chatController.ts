import { FileService } from '../../services/app.file';
import { PermissionsService } from '../../services/permissions.service';
import { WebClient } from 'solid-web-client';

export class ChatController {
    constructor(private file: FileService) { }

    newChat(URL) {
        this.file.createFolder(URL);
    }
}
