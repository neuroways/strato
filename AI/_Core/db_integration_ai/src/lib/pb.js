import PocketBase from 'pocketbase';

// PocketBase muss explizit auf die Backend-URL konfiguriert werden
const pb = new PocketBase('/.sfs-bd/');

export { pb };
