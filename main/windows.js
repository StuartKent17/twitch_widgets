var electron = require('electron') 
var BrowserWindow = electron.BrowserWindow
var ipcMain = electron.ipcMain
var config = require('./config')

var list = [] 
var count, player, phases;

ipcMain.on('create-window', create)

function create (obj, type) {
  var gType = type;
  var win = new BrowserWindow({
    title: config.APP_NAME,
    width: 500,
    height: 400,
    acceptFirstMouse: true
  })

  console.log('tst' +  gType);


  if (type == 'count') { 
    win.loadURL(config.COUNT)
    win.setMenuBarVisibility(false)
    gType="count";
    console.log('loading count template');
    count = win;
  } else if(type == 'phases') {
    win.loadURL(config.PHASES)
    win.setMenuBarVisibility(false)
    gType="phases";
  } else if(type == 'player') {
    win.loadURL(config.PLAYERS)
    win.setMenuBarVisibility(false)
    gType="player";
  } else {
    win.loadURL(config.INDEX)
    gType = "main";
  }
  

  win.setTitle(`${config.APP_NAME} - Window ${win.id}`)
  console.log(win.id);
  win.setTitle(`${config.APP_NAME} - Window ${gType}`)
  list.push(win)

  if (!config.DEBUG) win.webContents.openDevTools()

  win.webContents.on('did-finish-load', function () {
    win.webContents.send('type', gType)
    win.webContents.send('id', win.id)
  });
  

  win.on('closed', function () {
    destroy(win)
  })
}

function destroy (win) {
  var i = list.indexOf(win)
  if (i > -1) list.splice(i, 1)
  win = null
}


module.exports = { list,count, player, phases, create, destroy }
