const { app, BrowserWindow, Notification, ipcMain } = require('electron')
const path = require('node:path')

const sqlite3 = require('sqlite3');



const dbPath = path.join(__dirname, "receiptsSQLDB.db")

  
const sqlite = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Could not connect to the database:", err.message);
  } else {
    console.log("Successfully connected to the database.");
    sqlite.run("PRAGMA foreign_keys = ON;", (err) => {
      if (err) {
        console.error("Failed to enable foreign keys:", err.message);
      } else {
        console.log("Foreign keys enabled.");
      }
    });
  }
});



function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    sqlite.all(query, params, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 1200,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,

      preload: path.join(__dirname, 'preload.js')
    },
  })

  //load the index.html from a url
  win.loadFile(path.join(__dirname, 'build', 'index.html'));

  ipcMain.handle('get-all', async () => {
    const query = "SELECT EXISTS (SELECT customers.customer_name AS name, receipts.*, order.* FROM receipts INNER JOIN customers ON receipts.customer_id = customers.customer_id INNER JOIN orders ON orders.receipt_id = receipts.receipt_id);";
    return runQuery(query);
  });
  
  ipcMain.handle('get-product', async (event, data) => {
    const query = "SELECT EXISTS (SELECT customers.customer_name AS name, receipts.* FROM receipts INNER JOIN customers ON receipts.customer_id = customers.customer_id INNER JOIN orders ON orders.receipt_id = receipts.receipt_id WHERE orders.item = ?);";
    return runQuery(query, data);
  });
  
  ipcMain.handle('get-name', async (event, data) => {
    const query = "SELECT EXISTS (SELECT customers.customer_name AS name, receipts.* FROM receipts INNER JOIN customers ON receipts.customer_id = customers.customer_id INNER JOIN orders ON orders.receipt_id = receipts.receipt_id WHERE customers.customer_name = ?);";
    return runQuery(query, data);
  });
  
  ipcMain.handle('get-date', async (event, data) => {
    const query = "SELECT EXISTS (SELECT customers.customer_name AS name, receipts.* FROM receipts INNER JOIN customers ON receipts.customer_id = customers.customer_id INNER JOIN orders ON orders.receipt_id = receipts.receipt_id WHERE receipts.date = ?);";
    return runQuery(query, data);
  });
  
  ipcMain.handle('insert-receipt', async (event, data) => {
    const query = "INSERT INTO receipts(receipt_customer_name, customer_id) VALUES(?,?);";
    const params = [data];
    return runQuery(query, params);
  });
  
  ipcMain.handle('delete-receipt', async (event, data) => {
    const query = "DELETE FROM receipts WHERE receipt_id = ?;";
    const params = [data]
    return runQuery(query, params);
  });
  ipcMain.handle('get-all-customers', async () => {
    const query = "SELECT customer_name FROM customers;";
    return runQuery(query, []); 
  });
  
  ipcMain.handle('insert-order', async (event, data) => {
    const query = "INSERT INTO orders(item, quantity, price, status) VALUES (?,?,?,?);"
    const params = [data]
    return runQuery(query, params)
  })

  ipcMain.handle('delete-order', async (event, data) => {
    const query = "DELETE FROM orders WHERE orders.order_id = ?;"
    const params = [data]
    return runQuery(query, params)
  })
  ipcMain.handle('mark-order-as-paid', async (event, data) => {
    const query = "UPDATE orders SET orders.status = 'paid' WHERE orders.order_id = ?";
    const params = [data]
    return runQuery(query, params)
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

