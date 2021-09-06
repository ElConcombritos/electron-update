const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");



function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

async function checkforupdates() {
    try {
        const info = await autoUpdater.checkForUpdatesAndNotify();
        logger.info('checkForUpdatesAndNotify');
        logger.info(JSON.stringify(info));

        autoUpdater.on('update-downloaded', info => {
            const quitAndInstalled = autoUpdater.quitAndInstall();
            logger.info('quitAndInstalled');
            logger.info(quitAndInstalled);
        });

        autoUpdater.on('update-available', arg => {
            logger.info('update-available');
            logger.info(arg);
        });

        autoUpdater.on('update-not-available', arg => {
            logger.info('update-not-available');
            logger.info(arg);
        });

        autoUpdater.on('download-progress', arg => {
            logger.info('download-progress');
            logger.info(arg);
        });

        autoUpdater.on('error', error => {
            logger.info('error');
            logger.info(error.message);
            logger.info(error.stack);
        });
    }
    catch (error) {
        logger.info('autoupdate failed');
    }
}

app.whenReady().then(() => {
checkforupdates()

  createWindow()
})
