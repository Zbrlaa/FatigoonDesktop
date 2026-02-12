const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    // frame: false, //Enleve bordure
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(
    path.join(__dirname, '../FatigoonUI/dist/FatigoonUI/browser/index.html')
  );

  win.removeMenu();

  //Raccourcis clavier
  // win.webContents.on('did-finish-load', () => {
  //   globalShortcut.register('CommandOrControl+P', () => {
  //     // Cette commande force l'ouverture de la fenêtre d'impression native de Chromium
  //     win.webContents.print({ silent: false }); 
  //   });
  // });

  return win;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});