var electron = require('electron')
var Menu = electron.Menu
var app = electron.app
var menu = require('./main/menu')
var windows = require('./main/windows')

app.on('ready', function () {
  Menu.setApplicationMenu(menu)
  windows.create('main');

  const ret = electron.globalShortcut.register('CommandOrControl+1', () => { 
      windows.list[1].webContents.send('asynchronous-message', {'do': 'count-p1-up'}); 
  })
  const ret2 = electron.globalShortcut.register('CommandOrControl+2', () => { 
    windows.list[1].webContents.send('asynchronous-message', {'do': 'count-p1-down'}); 
  })
  const ret3 = electron.globalShortcut.register('CommandOrControl+3', () => { 
    windows.list[1].webContents.send('asynchronous-message', {'do': 'count-p2-up'}); 
  })
  const ret4 = electron.globalShortcut.register('CommandOrControl+4', () => { 
    windows.list[1].webContents.send('asynchronous-message',{'do' : 'count-p2-down'}); 
  }) 
  const ret5 = electron.globalShortcut.register('CommandOrControl+q', () => { 
    windows.list[1].webContents.send('asynchronous-message', {'do': 'next-phase'}); 
  })
  const ret6 = electron.globalShortcut.register('CommandOrControl+e', () => { 
    windows.list[1].webContents.send('asynchronous-message',{'do' : 'last-phase'}); 
  }) 
  const ret7 = electron.globalShortcut.register('CommandOrControl+r', () => { 
    windows.list[1].webContents.send('asynchronous-message', {'do': 'reset-phase'}); 
  }) 
  
if (!ret) {
  console.log('registration failed')
}

// Check whether a shortcut is registered.
console.log(electron.globalShortcut.isRegistered('CommandOrControl+1'))
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (windows.list.length === 0) windows.create()
})
