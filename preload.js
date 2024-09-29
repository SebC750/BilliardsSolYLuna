
const { ipcRenderer, contextBridge } = require('electron');



let dbOperations = {
   getAll: () => ipcRenderer.invoke('get-all'),
   getAllByTable: () => ipcRenderer.invoke('get-all-by-table'),
   searchForProduct: (data) => ipcRenderer.invoke('get-product', data),
   searchForName: (data) => ipcRenderer.invoke('get-name', data),
   searchForDate: (data) => ipcRenderer.invoke('get-date', data),
   searchForStatus: (data) => ipcRenderer.invoke('get-status',data),
   insertReceipt: (data) => ipcRenderer.invoke('insert-receipt', data),
   deleteReceipt: (data) => ipcRenderer.invoke('delete-receipt', data),
   deleteReceiptFromOtherReceipts: async (id, section, name) => {
      return await ipcRenderer.invoke('delete-receipt-from-other-receipts', {
        id: id,
        section: otherParameter1,
        name: otherParameter2
      })},
   updateReceipt: (data) => ipcRenderer.invoke('update-receipt', data), 
   changeOrderStatus: (data) => ipcRenderer.invoke('mark-order-as-paid', data), 
}


contextBridge.exposeInMainWorld('database', dbOperations)
