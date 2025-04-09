const { app, BrowserWindow, Menu, screen } = require('electron/main')
const path = require('path')
const { writeFile, readFile } = require('fs').promises;
const { ipcMain } = require('electron')

ipcMain.on('open-timer-window', () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;
  createTimerWindow(width)
})

const isDev = process.env.NODE_ENV !== 'development'

function createTimerWindow(width){
  const timerWindow = new BrowserWindow({
    width: 500,
    height: 250,
    x: width - 500,
    y: 0,
    resizable: false,
    titleBarStyle: 'hidden',
    frame: false,
    titleBarOverlay: {
      color: '#B8B449',
      symbolColor: '#ffffff',
      height: 30
    } ,
    icon: path.join(__dirname, 'assets', 'icons/win/icon.ico'),
 
    webPreferences: {
      nodeIntegration: true, 
      preload: path.join(__dirname, 'preload.js')
    }
  
  })
  //loads content into the window
  timerWindow.loadFile('renderer/timer.html')

}

const createWindow = (width) => {
    // Creates a new window object
  const win = new BrowserWindow({
    width: 500,
    height: 800,
    //doesnt work
    x: width - 500,
    y: 0,
    //alwaysOnTop: true,
    titleBarStyle: 'hidden',
    frame: false,
    titleBarOverlay: {
      color: '#B8B449',
      symbolColor: '#ffffff',
      height: 30
    } ,
    icon: path.join(__dirname, 'assets', 'icons/win/icon.ico'),
 
    webPreferences: {
      nodeIntegration: true, 
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
  //Get the screen size
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;



  // calls the window when the app is ready
  createWindow(width)

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

// Template for creating menu -  not used here
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