const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('path')

const isDev = process.env.NODE_ENV !== 'development'

const createWindow = () => {
    // Creates a new window object
  const win = new BrowserWindow({
    width: isDev? 1400: 800,
    height: 1000,
    webPreferences: {
      nodeIntegration: true, // This allows using Node.js in the renderer process,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // Open dev tools if in dev enviroment
  if (isDev) {
    win.webContents.openDevTools()
  }

  //loads content into the window
  win.loadFile('renderer/todo.html')
}


//App is ready
app.whenReady().then(() => {
    // calls the window when the app is ready
  createWindow()

  //implement menu
  const mainMenu = Menu.buildFromTemplate(menu)
  //nastavi menu
  Menu.setApplicationMenu(mainMenu)

    // creates a new window when the app is activated
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})











//Vytvorim template pro menu
const menu = [
  {
    role: 'fileMenu',
    /*
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => {
          app.quit()
        },
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
      */
  }
]


//quits the app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})