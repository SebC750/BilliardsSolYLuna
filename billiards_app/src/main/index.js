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
ipcMain.handle('get-all', async (err, {offset, limit}) =>{
  try {
    const totalRecords = await db.count({});  
    const getAllDatabaseValues = await db.find({}).skip(offset).limit(limit).sort({ date: -1 });
    return {
      orders: getAllDatabaseValues,
      totalCount: totalRecords 
    };
  } catch (error) {
    console.error('Could not get all of the database records! Error:', error);
    throw error;
  }
})

ipcMain.handle('get-product', async (event, data, {offset, limit}) =>{
  try{
    const totalRecords = await db.count({product: data})
    const getAllDatabaseValues = await db.find({product: data}).skip(offset).limit(limit).sort({product: -1})
    return {
      orders: getAllDatabaseValues,
      totalCount: totalRecords
    }
  }catch(error){
    console.error('Could not get all of the database records by products! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-name', async (event, data, offset, limit) =>{
  try{
    const totalRecords = await db.count({clientName: data})
    const getAllDatabaseValues = await db.find({clientName: data}).skip(offset).limit(limit).sort({clientName: -1})
    return {
      orders: getAllDatabaseValues,
      totalCount: totalRecords
    }
  }catch(error){
    console.error('Could not get all of the database records by client name! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-date', async (event, data, offset, limit) =>{
  try{
    const totalRecords = await db.count({date: data})
    const getAllDatabaseValues = await db.find({date: data}).skip(offset).limit(limit).sort({date: -1})
    return {
      orders: getAllDatabaseValues,
      totalCount: totalRecords
    }
  }catch(error){
    console.error('Could not get all of the database records by date! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-status', async (event, data, offset, limit) => {
  try{
    const totalRecords = await db.count({status: data})
    const getAllDatabaseValues = await db.find({status: data}).skip(offset).limit(limit).sort({date: -1})
    return {
      orders: getAllDatabaseValues,
      totalCount: totalRecords
    }
  }catch(error){
    console.error('Could not get all of the database records by pay status! Error:', error);
    throw error;
  }
  
})

ipcMain.handle('get-table', async (event, data, offset, limit) =>{
  try{
    const totalRecords = await db.count({table: data})
    const getAllDatabaseValues = db.find({table: data}).skip(offset).limit(limit).sort({date: -1})
    return {
      orders: getAllDatabaseValues,
      totalCount: totalRecords
    }
  }catch(error){
    console.error('Could not get all of the database records by table! Error:', error);
    throw error;
  }
  
})
ipcMain.handle('get-receipt-orders', async (event, data) =>{
  try{
    const getAllDatabaseValues = db.find({receiptID: data}).sort({date: 1})
    return getAllDatabaseValues
  }catch(error){
    console.error('Could not get all of the database records by receipts! Error:', error);
    throw error;
  }
  
})
ipcMain.handle('insert-order', async (event, data) =>{
  try{
    db.insert(data, function(err, newData){
      console.log(newData)
    })
    return "order saved to db"
  }catch(error){
    console.error('Could not insert the order into the database. Error:', error);
    throw error;
  }
  
})

ipcMain.handle('delete-order', async (err, data) =>{
  try{
    db.remove({_id: data}, function(err, newData){
      console.log(newData)
    })
  }catch(error){
    console.error('Could not delete the order from the database. Error:', error);
  }
  
})

ipcMain.handle('delete-all-orders-from-receipt', async (err, data) =>{
  try{
    db.remove({receiptID: data}, function(err, newData){
      console.log(newData)
    })
  }catch(error){
    console.error('Could not delete the order from the database. Error:', error);
  }
  
})

ipcMain.handle('mark-order-as-paid', async(err, data) => {
  console.log(data)
  try{
    db.update({_id: data},{$set:{status: "cancelado"}}, function(err, newData) {
      console.log(newData)
    })
    return "order set to paid."
  }catch(error){
    console.error('Unable to mark the order as paid. Error:', error);
  }
  
})

ipcMain.handle('generate-new-receipt-id', async () =>{
  try {
    const newReceiptId = uuidv4();
    return newReceiptId
  } catch (error) {
    console.error('Generate new receipt ID. Error: ', error)
  }
})
//-----------------------------------------------//

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    resizable:false,
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
