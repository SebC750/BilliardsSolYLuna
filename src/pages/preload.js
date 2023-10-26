
const { ipcRenderer, contextBridge } = require('electron');

let func =
{
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    }
  }
}
contextBridge.exposeInMainWorld('api', func);
/*
let consoleLog = {
  sendMessage: () => ipcRenderer.send("Good morning.")
}

contextBridge.exposeInMainWorld('m', consoleLog)
*/
const API = {
    getMemory: 10,
}

contextBridge.exposeInMainWorld('get', API)

