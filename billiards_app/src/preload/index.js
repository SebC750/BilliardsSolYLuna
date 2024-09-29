import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getAll: () => ipcRenderer.invoke('get-all'),
  getAllByTable: () => ipcRenderer.invoke('get-all-by-table'),
  searchForProduct: (data) => ipcRenderer.invoke('get-product', data),
  searchForName: (data) => ipcRenderer.invoke('get-name', data),
  searchForDate: (data) => ipcRenderer.invoke('get-date', data),
  searchForStatus: (data) => ipcRenderer.invoke('get-status',data),
  insertReceipt: (data) => ipcRenderer.invoke('insert-receipt', data),
  deleteReceipt: (data) => ipcRenderer.invoke('delete-receipt', data),
  updateReceipt: (data) => ipcRenderer.invoke('update-receipt', data), 
  changeOrderStatus: (data) => ipcRenderer.invoke('mark-order-as-paid', data), 
  
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
