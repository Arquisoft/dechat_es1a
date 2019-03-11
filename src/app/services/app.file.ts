import fileClient from 'solid-file-client';

export class FileService {
    fs: FileService;

    /**
     *
     * @param URL direction where the file will be saved
     * @param content
     * @param contentType file extension for the file, it could be a ttl
     */
    protected createFile(URL, content, contentType) {

        fileClient.createFile(URL).then(fileCreated => {
            console.log(`Created file ${fileCreated}.`);
        }, err => console.log(err));
    }

    /**
     *
     * @param URL direction where the folder will be saved
     * It will be top if we name the folder as the users who have the chat inside
     */
    protected createFolder(URL) {
        fileClient.createFolder(URL).then(success => {
            console.log(`Created folder ${URL}.`);
        }, err => console.log(err));
    }

    /**
     * Method to give name to the folder where the chat files will be stored
     * @param abreChat The one who opens the chat
     * @param recibeChat the one who receives communications from chat
     */
    protected fileName(openChat: string, receiveChat: string): string {
        openChat = fileClient.checkSession();
        const fileName = openChat.concat(receiveChat);
        return fileName;
    }

}
