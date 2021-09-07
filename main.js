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

		autoUpdater.netSession.setProxy({
			proxyRules: "pouetpouet",
		});
        autoUpdater.on('update-downloaded', info => {
            const quitAndInstalled = autoUpdater.quitAndInstall();
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
