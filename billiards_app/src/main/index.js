import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join, resolve} from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Datastore from 'nedb-promises';
import { v4 as uuidv4 } from 'uuid';

//-------------------------------------------//
// Database Connection
const db = new Datastore({ filename: "orders.db", autoload: true});

//-------------------------------------------//


//-------------------------------------------//
//Database API routes
ipcMain.handle('get-all', async () =>{
  try {
    const getAllDatabaseValues = await db.find({});
    return getAllDatabaseValues;
  } catch (error) {
    console.error('Could not get all of the database records! Error:', error);
    throw error;
  }
})

ipcMain.handle('get-product', async (err, data) =>{
  try{
    const getAllDatabaseValues = await db.find({product: data})
    return getAllDatabaseValues
  }catch(e){
    console.error('Could not get all of the database records by products! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-name', async (err, data) =>{
  try{
    const getAllDatabaseValues = await db.find({ordername: data})
    return getAllDatabaseValues
  }catch(e){
    console.error('Could not get all of the database records by client name! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-date', async (err, data) =>{
  try{
    const getAllDatabaseValues = await db.find({date: data})
    return getAllDatabaseValues
  }catch(e){
    console.error('Could not get all of the database records by date! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-status', async (err, data) => {
  try{
    const getAllDatabaseValues = await db.find({status: data})
    return getAllDatabaseValues
  }catch(e){
    console.error('Could not get all of the database records by pay status! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-all-by-table', async (err, data) =>{
  try{
    const getAllDatabaseValues = db.find({mesa: data})
    return getAllDatabaseValues
  }catch(e){
    console.error('Could not get all of the database records by table! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('insert-order', async (err, data) =>{
  try{
    db.insert(data, function(err, newData){
      console.log(newData)
    })
    return "order saved to db"
  }catch(e){
    console.error('Could not insert the order into the database. Error:', error);
    throw error;
  }
  
})

ipcMain.handle('delete-order', async (err, data) =>{
  try{
    db.remove({_id: data}, function(err, newData){
      console.log(newData)
    })
  }catch(e){
    console.error('Could not delete the order from the database. Error:', error);
  }
  
})

ipcMain.handle('mark-order-as-paid', async(err, data) => {
  try{
    db.update({_id: data},{$set:{status: "cancelado"}}, function(err, newData) {
      console.log(newData)
    })
    return "order set to paid."
  }catch(e){
    console.error('Unable to mark the order as paid. Error:', error);
  }
  
})

ipcMain.handle('generate-new-receipt-id', async () =>{
  try {
    const newReceiptId = uuidv4();
    return newReceiptId
  } catch (e) {
    console.error()
  }
})
//-----------------------------------------------//

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
