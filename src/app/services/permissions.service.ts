import { SolidPermissions } from 'solid-permissions';
import { WebClient } from 'solid-web-client';

export class PermissionsService {
    per: SolidPermissions;
    webClient: WebClient;

    grantPermissions(URL, webID) {
       const p = this.per.getPermissions(URL, this.webClient, webID);
    }
}
