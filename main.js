const { app, BrowserWindow, Notification, ipcMain} = require('electron')
const path = require('node:path')

const Datastore = require('nedb-promises');

var db = Datastore.create({ filename: 'receiptDB.db', autoload: true });
db.load();

var isDev = true;

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}
function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 1200,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      
      preload:  path.join(__dirname,'preload.js')
    },
  })
    
  //load the index.html from a url
  win.loadFile(path.join(__dirname, '/public/index.html'));

  ipcMain.handle('get-all', async () =>{
    const getAllDatabaseValues = await db.find({})
    
    
    
    return getAllDatabaseValues
  })
  ipcMain.handle('get-product', async (err, data) =>{
    const getAllDatabaseValues = await db.find({product: data})
    
    
    
    return getAllDatabaseValues
  })
  ipcMain.handle('get-name', async (err, data) =>{
    const getAllDatabaseValues = await db.find({ordername: data})
    
    
    
    return getAllDatabaseValues
  })
  ipcMain.handle('get-date', async (err, data) =>{
    const getAllDatabaseValues = await db.find({date: data})
    
    
    
    return getAllDatabaseValues
  })
  ipcMain.handle('insert-receipt', async (err, data) =>{
    const insertReceipt = await db.insert(data)
    
    
    
    return insertReceipt
  })
  ipcMain.handle('delete-receipt', async (err, data) =>{
    const deleteReceipt = await db.remove({_id: data})
    
    
    
    return deleteReceipt
  })
  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('notify', (event, args) => {
 console.log(args)
})

