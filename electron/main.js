const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '/../icon.png')
    })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl)

    const name = electron.app.getName()
    const template = [
        {
            label: name,
            submenu: [{
                label: `About ${name}`,
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                click: () => { 
                    app.quit() 
                },
                accelerator: 'CmdOrCtrl+Q'
            }]
        }, {
            label: 'Actions',
            submenu: [{
                label: 'Increment',
                click: () => {
                    win.webContents.send('increment')
                }
            }, {
                label: 'Decrement',
                click: () => {
                    win.webContents.send('decrement')
                }
            }]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})