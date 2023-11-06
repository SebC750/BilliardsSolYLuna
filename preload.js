
const { ipcRenderer, contextBridge } = require('electron');



let dbOperations = {
   getAll: () => ipcRenderer.invoke('get-all'),
   searchForProduct: (data) => ipcRenderer.invoke('get-product', data),
   searchForName: (data) => ipcRenderer.invoke('get-name', data),
   searchForDate: (data) => ipcRenderer.invoke('get-date', data),
   insertReceipt: (data) => ipcRenderer.invoke('insert-receipt'),
   deleteReceipt: (data) => ipcRenderer.invoke('delete-receipt'),
   updateReceipt: (data) => ipcRenderer.invoke('update-receipt'), 
}


contextBridge.exposeInMainWorld('database', dbOperations)
