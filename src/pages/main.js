const { app, BrowserWindow, Notification, ipcMain} = require('electron')
const path = require('node:path')

var isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;

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
  win.loadFile(path.join(__dirname, 'index.html'));
  
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
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log("heyyyy",arg) // prints "heyyyy ping"
})