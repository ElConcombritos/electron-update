const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");
const fs = require("fs")
const path = require("path")

var user = ""
var pass = ""
var proxyString = ""

autoUpdater.on('login', async (authInfo, callback) => {
  const ["toto", "toto"] = ...... // prompt on UI, use cache, other solution to acquire credentials
  callback(username, password)
})
autoUpdater.requestHeaders = {'User-Agent': userAgent}

let rawdata = fs.readFile("/home/acreoo/info_proxy.json",'utf8',(err, data) => {
	if (err) {
		console.log(err)
		return	
	}
	console.log(JSON.parse(data))
	user = JSON.parse(data).user
	pass = JSON.parse(data).pass
	proxyString = "http://192.168.0.165:3128"
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
  win.loadFile('index.html')
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
	console.log(error)
        logger.info('autoupdate failed');
    }
}


