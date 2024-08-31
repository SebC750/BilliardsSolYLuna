
const { ipcRenderer, contextBridge } = require('electron');



let dbOperations = {
   getAll: () => ipcRenderer.invoke('get-all'),
   searchForProduct: (data) => ipcRenderer.invoke('get-product', data),
   searchForName: (data) => ipcRenderer.invoke('get-name', data),
   searchForDate: (data) => ipcRenderer.invoke('get-date', data),
   searchForUnpaidOrders: (data) => ipcRenderer.invoke('search-for-unpaid-orders',data),
   insertReceipt: (data) => ipcRenderer.invoke('insert-receipt', data),
   deleteReceipt: (data) => ipcRenderer.invoke('delete-receipt', data),
   updateReceipt: (data) => ipcRenderer.invoke('update-receipt', data), 
   changeOrderStatus: (data) => ipcRenderer.invoke('mark-order-as-paid', data), 
}


contextBridge.exposeInMainWorld('database', dbOperations)
