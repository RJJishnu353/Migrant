const electron = require('electron');
const application = electron.app;
const browserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const dialog = electron.dialog
const {Menu} = electron
const {Tray} = electron
const {ipcMain} = require('electron')

let mainWindow = null;
let subWindow = null;
let appIcon = null

var page_title = null;
var docs=null;
var child=null;
var defaultSheets=null;

//Giving my application a name 
application.setName('Migrant');


//Function to load profile_page.html
function loadProfilePage(){
	mainWindow.loadURL('file://' + __dirname + '/view/screen3a.html');
	mainWindow.maximize(); //maximize the window
	mainWindow.on('closed', function() {
		mainWindow = null;
	});	
}


//Function to start the application with splash-screen
function startApp() {
	mainWindow = new browserWindow({ width: 600, height: 500, frame:false, 
				   	 show:false,icon: __dirname+'/M1.png',
					 movable:false});
	mainWindow.loadURL('file://' + __dirname + '/view/index.html');
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
	mainWindow.once('ready-to-show', () => {
	  mainWindow.show();
	});
	setTimeout(loadProfilePage, 5000 );
}


//Now let's start the app
application.on('ready', startApp);


ipc.on('request-to-display-progress-window', function (event) {
  
    //event.sender.send('saved-file', filename);

	child = new browserWindow({parent: mainWindow, width: 300, height: 135, modal: true, show: false, 
								   frame:false, resizable:false, movable:false, fullscreen:false})
	child.loadURL('file://' + __dirname + '/view/progress-bar.html')
	child.once('ready-to-show', () => {
  	child.show()
	})
  
})


ipc.on('request-to-display-error-window', function (event) {

  	dialog.showErrorBox('Warning!!!', 'First save your workbook with filename "Migrant", then click the generate files button again.')

})  


ipc.on('request-to-display-success-window', function (event) {
  
    child.close();
    var options = {
    type: 'info',
    title: 'Success',
    message: "Success. Your files were created as seperate sheets in the same file.",
    buttons: ['Ok']
   } 
  
   dialog.showMessageBox(options, function (index) {
   event.sender.send('information-dialog-selection', index);
   })

})  


ipc.on('put-in-tray', function (event) {
  const iconPath = __dirname + '/M1.png' 
  appIcon = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
  {
    label: 'About Software',
    click: function () {
    var options = {
    type: 'info',
    title: 'Application Details',
    message: "App Name : Migrant \n" +
    		"App Version : 1.0.0 \n" +
    		"Created By : P Jishnu Jaykumar \n" +
    		"Developed For : Navjeevan Trust (Shapar)\n" +
    		"Development Framework : Electron \n" +
    		"Framework Version : 1.4.11 \n" +
    		"Release Date : 15-12-2016",

    buttons: ['Ok']
  }
  dialog.showMessageBox(options, function (index) {
    //event.sender.send('information-dialog-selection', index);
  })  
    }
  },

  {
    label: 'Close',
    click: function () {
      //event.sender.send('tray-removed')
      application.quit();
    }
  }])
  appIcon.setToolTip('Migrant.')
  appIcon.setContextMenu(contextMenu)
})

ipc.on('remove-tray', function () {
  appIcon.destroy()
})

ipc.on('request-with-sheet-names', function (event, defaultSheetsNames) {
  defaultSheets=defaultSheetsNames;
})


ipc.on('request-to-get-default-sheet-names', function (event) {
    event.sender.send('default-sheet-names', defaultSheets);
})  


