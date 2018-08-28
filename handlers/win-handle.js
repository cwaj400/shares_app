const $ = require('jquery');
const {remote} = require('electron');
const path = require('path');
const BrowserWindow = remote.BrowserWindow;

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', function (event) {
    const modelPath = path.join('file://', __dirname, 'add.html');
    let win = new BrowserWindow({width: 400, height: 200, frame: false, transparent: true, alwaysOnTop: true});
    win.on('close', function () {
        win = null
    });
    win.loadURL(modelPath);
    win.show()
});


var win = remote.getCurrentWindow();

$('#minimize').click(function () {
    win.minimize();
});

$('#close').click(function () {
    win.close();
});

