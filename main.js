const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('path')
const { spawn } = require('child_process');
const { writeFile, readFile } = require('fs').promises;


const isDev = process.env.NODE_ENV !== 'development'



async function startBackendServer() {
  const serverPath = path.join(__dirname, 'backend', 'server.js');
  const server = spawn('node', [serverPath]);

  // Capture stdout
  server.stdout.on('data', (data) => {
    console.log(`Backend server output: ${data.toString()}`);
  });

  // Capture stderr (error output)
  server.stderr.on('data', (data) => {
    console.error(`Backend server error: ${data.toString()}`);
  });

  // Handle the process close event
  server.on('close', (code) => {
    console.log(`Backend server process exited with code ${code}`);
  });

  // Handle any errors with spawning the process
  server.on('error', (err) => {
    console.error(`Error spawning backend server: ${err.code}`);
    console.error(`Error details: ${err.message}`);
  });
}

const createWindow = () => {
    // Creates a new window object
  const win = new BrowserWindow({
    width: isDev? 1400: 800,
    height: 1000,
    //doesnt work
    x: 0 ,
    y: 0,
    alwaysOnTop: true,
    titleBarStyle: 'hidden',
    frame: false,
    titleBarOverlay: {
      color: '#B8B449',
      symbolColor: '#ffffff',
      height: 30
    } ,
    icon: path.join(__dirname, 'assets', 'icons/win/icon.ico'),
 
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
  
  startBackendServer()
  .then(() => {
    console.log('Backend server started successfully!');
  })
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