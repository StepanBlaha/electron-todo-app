const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
    // Creates a new window object
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // This allows using Node.js in the renderer process
    }
  })
  //loads content into the window
  win.loadFile('index.html')
}

app.whenReady().then(() => {
    // calls the window when the app is ready
  createWindow()
    // creates a new window when the app is activated
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
//quits the app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})