import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { generateNewReceiptID } from '../renderer/src/utilities/dbOperations'
// Custom APIs for renderer
const api = {
  getAll: (offset, limit) => ipcRenderer.invoke('get-all', { offset, limit }),
  searchForTable: (data, offset, limit) => ipcRenderer.invoke('get-table', { data, offset, limit }),
  searchForProduct: (data, offset, limit) => ipcRenderer.invoke('get-product', data, {offset, limit }),
  searchForName: (data, offset, limit) => ipcRenderer.invoke('get-name', data, {offset, limit }),
  searchForDate: (data, offset, limit) => ipcRenderer.invoke('get-date', data,{offset, limit }),
  searchForStatus: (data, offset, limit) => ipcRenderer.invoke('get-status', data, { offset, limit }),
  searchForReceiptOrders: (data) => ipcRenderer.invoke('get-receipt-orders', data),
  insertOrder: (data) => ipcRenderer.invoke('insert-order', data ),
  deleteOrder: (data) => ipcRenderer.invoke('delete-order', data ),
  deleteAllOrdersFromReceipt: (data) => ipcRenderer.invoke('delete-all-orders-from-receipt', data ),
  changeOrderStatus: (data) => ipcRenderer.invoke('mark-order-as-paid', data ), 
  generateNewReceiptID: () => ipcRenderer.invoke('generate-new-receipt-id')
}


// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
