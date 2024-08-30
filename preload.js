
const { ipcRenderer, contextBridge } = require('electron');



let dbOperations = {
   getAll: () => ipcRenderer.invoke('get-all'),
   searchForProduct: (data) => ipcRenderer.invoke('get-product', data),
   searchForName: (data) => ipcRenderer.invoke('get-name', data),
   searchForDate: (data) => ipcRenderer.invoke('get-date', data),
   insertReceipt: (data) => ipcRenderer.invoke('insert-receipt', data),
   deleteReceipt: (data) => ipcRenderer.invoke('delete-receipt', data),
   updateReceipt: (data) => ipcRenderer.invoke('update-receipt', data), 
   markOrderAsPaid: (data) => ipcRenderer.invoke('mark-order-as-paid', data),
}


contextBridge.exposeInMainWorld('database', dbOperations)
