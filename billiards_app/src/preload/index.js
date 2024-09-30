import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { generateNewReceiptID } from '../renderer/src/utilities/dbOperations'
// Custom APIs for renderer
const api = {
  getAll: () => ipcRenderer.invoke('get-all'),
  getAllByTable: (data) => ipcRenderer.invoke('get-all-by-table', data),
  searchForProduct: (data) => ipcRenderer.invoke('get-product', data),
  searchForName: (data) => ipcRenderer.invoke('get-name', data),
  searchForDate: (data) => ipcRenderer.invoke('get-date', data),
  searchForStatus: (data) => ipcRenderer.invoke('get-status',data),
  insertOrder: (data) => ipcRenderer.invoke('insert-order', data),
  deleteOrder: (data) => ipcRenderer.invoke('delete-order', data),
  changeOrderStatus: (data) => ipcRenderer.invoke('mark-order-as-paid', data), 
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
