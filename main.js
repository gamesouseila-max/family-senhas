const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: "Vault-Master Secure",
    icon: path.join(__dirname, 'icon.ico')
  });

  win.loadFile('www/index.html');

  // Proteção Profissional: Bloqueia captura e gravação de tela
  win.setContentProtection(true);
}

app.whenReady().then(() => {
  createWindow();

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-available', () => {
    console.log('Atualização disponível!');
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('Atualização baixada. O app será reiniciado.');
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('error', (err) => {
    console.error('Erro no auto-updater:', err);
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
