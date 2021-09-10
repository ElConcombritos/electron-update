const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");
const fs = require("fs")
const path = require("path")

var user = ""
var pass = ""
var proxyString = ""

let rawdata = fs.readFile("/home/acreoo/info_proxy.json",'utf8',(err, data) => {
	if (err) {
		console.log(err)
		return	
	}
	console.log(JSON.parse(data))
	user = JSON.parse(data).user
	pass = JSON.parse(data).pass
	proxyString = "http://"+user+":"+pass+"@192.168.0.165:3128"
	console.log(proxyString)
	app.whenReady().then(() => {
	checkforupdates()

	  createWindow()
	})

})

	

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.webContents.session.setProxy({proxyRules:"http://toto:toto@192.168.0.165:3128"},function () {win.loadURL('https://whatismyipaddress.com/');})
  //win.loadFile('index.html')
}

async function checkforupdates() {
console.log("proxy")
console.log(proxyString)
console.log("proxy")
    try {

        const info = await autoUpdater.checkForUpdatesAndNotify();

		autoUpdater.netSession.setProxy({
			proxyRules: proxyString,
		});
        autoUpdater.on('update-downloaded', info => {
            const quitAndInstalled = autoUpdater.quitAndInstall();
           });

    }
    catch (error) {
        logger.info('autoupdate failed');
    }
}


