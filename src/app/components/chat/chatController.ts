import { FileService } from 'solid-auth-client';
import { PermissionsService } from '../../services/permissions.service';
import { WebClient } from 'solid-web-client';

export class ChatController {
    constructor(private file: FileService) { }

    newChat(URL) {
        this.file.createFolder(URL);
    }

    /**
     *
     * @param fileURL
     * @param user
     */
    grantPermissions(fileURL: string, user: string) {
        const aclURL = fileURL + '.acl';
        this.generateACL(aclURL, user);
    }

    /**
     * Generates an ACL permissions file in the specified folder and grants read privilege to the other user
     * @param fileURL
     * @param user the user who we are granting permissions to read the file
     */
    generateACL(fileURL: string, user: string) {
        user = user.replace('#me', '#');
        const ACL = '@prefix : <#>. \n'
            + '@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n'
            + '@prefix c: </profile/card#>. \n'
            + '@prefix c0: <' + user + '>. \n'

            + '\n:ControlReadWrite \n'
            + '\ta n0:Authorization; \n'
            + '\tn0:accessTo <' + fileURL + '>; \n'
            + '\tn0:agent c:me; \n'
            + '\tn0:mode n0:Control, n0:Read, n0:Write. \n'
            + ':Read \n'
            + '\ta n0:Authorization; \n'
            + '\tn0:accessTo <' + fileURL + '>; \n'
            + '\tn0:agent c0:me; \n'
            + '\tn0:mode n0:Read.';

        return ACL;
    }
}
