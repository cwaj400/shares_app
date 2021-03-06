const {app, BrowserWindow, Menu, Tray} = require('electron');
const shell = require('electron').shell;
const ipc = require('electron').ipcMain;
const electron = require('electron');
const path = require('path');
const assetsDirectory = path.join(__dirname, 'assets');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 970,
        height: 210,
        frame: false,
        minHeight: 200,
        minWidth: 950,
    });


    // and load the index.html of the app.
    win.loadFile('src/index.html');

    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    setMenu();
}

//WL1I2IGZAZKHBXBP


function setMenu() {
    var menu = Menu.buildFromTemplate(([
        {
            label: 'Menu',
            submenu: [
                {
                    label: 'Yahoo Finance', accelerator: 'Cmd+Y', click() {
                        shell.openExternal('https://yhoo.it/2olc5CH')
                    }
                },
                {type: 'separator'},
                {
                    label: 'Quit', accelerator: 'Cmd+Q', click() {
                        app.quit();
                    }
                },
            ]
        },
        {
            label: 'Info',
            submenu: [{label: 'Built by Will Angell-James. August 2018'}]
        }
    ]));
    Menu.setApplicationMenu(menu);
}


// createTray = () => {
//     tray = new Tray('../assets/images/btc.png');
//     tray.setToolTip('Getting market price...');
// };



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    // createTray();
    createWindow()
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});


app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});


ipc.on('update-notify-value', function (event, arg) {
    win.webContents.send('targetPriceVal', arg);
});


