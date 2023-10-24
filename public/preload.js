const { contextBridge, ipcRenderer } = require('electron')
window.require = require;
const {app} = require('electron');
const Datastore = require('nedb');

var db = new Datastore({ filename: 'receiptDB.db', autoload: true });
db.loadDatabase();
contextBridge.exposeInMainWorld(
    'electron',
    {
      doThing: () =>{ ipcRenderer.send('do-a-thing')
      
    },
      getAll: () => {
          db.find({name: 'world'} , function (err, docs) {
            console.log(docs)
          });
            
      }
    }
  )