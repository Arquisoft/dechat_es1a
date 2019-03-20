import { FileService } from 'solid-auth-client';
import { PermissionsService } from '../../services/permissions.service';
import { WebClient } from 'solid-web-client';

export class ChatController {
    constructor(private file: FileService) {  }

    /**
     * Method to grant privileges to the main folder of the app
     * @param fileURL
     */
    grantBasePermissions(fileURL: string) {
        const aclURL = fileURL;
        console.log('Creating file in ' + aclURL);
        this.file.updateFile(aclURL, this.generateBaseACL(aclURL));
        console.log('File created');
    }

    /**
     * Method to grant privileges to a user in an specific file
     * @param fileURL
     * @param user
     */
    grantPermissions(fileURL: string, user: string) {
        const aclURL = fileURL;
        console.log('Creating file in ' + aclURL);
        this.file.updateFile(aclURL, this.generateACL(aclURL, user));
        console.log('File created');
    }

    /**
     * Generates an ACL permissions file in the specified folder and grants read privilege to the public
     * @param fileURL
     */
    private generateBaseACL(fileURL: string) {
        const ACL = '@prefix : <#>. \n'
            + '@prefix acl: <http://www.w3.org/ns/auth/acl#>. \n'
            + '@prefix c: </profile/card#>. \n'
            + '@prefix c0: <#owner>. \n'

            + '\n:ControlReadWrite \n'
                + '\ta acl:Authorization; \n'
                + '\tacl:accessTo <' + fileURL + '>; \n'
                + '\tacl:agent c:me; \n'
                + '\tacl:mode acl:Control, acl:Read, acl:Write. \n'


            + '\n:Read \n'
            + '\ta acl:Authorization; \n'
            + '\tacl:accessTo <' + fileURL + '>; \n'
            + '\tacl:agent c0:me; \n'
            + '\tacl:mode acl:Read.';

        return ACL;
    }

    /**
     * Generates an ACL permissions file in the specified folder and grants read privilege to the other user
     * @param fileURL
     * @param user the user who we are granting permissions to read the file
     */
    private generateACL(fileURL: string, user: string) {
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
