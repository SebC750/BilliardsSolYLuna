
const { ipcRenderer, contextBridge } = require('electron');



let dbOperations = {
   getAll: () => ipcRenderer.invoke('get-all'),
   insertReceipt: () => ipcRenderer.invoke('insert-receipt'),
   deleteReceipt: () => ipcRenderer.invoke('delete-receipt'),
   updateReceipt: () => ipcRenderer.invoke('delete-receipt'), 
}


contextBridge.exposeInMainWorld('database', dbOperations)
